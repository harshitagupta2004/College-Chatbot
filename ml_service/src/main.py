from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Dict, Any
import joblib
import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="QueryAI ML Service")

# Download required NLTK data
nltk.download('punkt')
nltk.download('stopwords')

class Query(BaseModel):
    text: str

# Load the trained model and vectorizer
MODEL_PATH = os.getenv("MODEL_PATH", "data/model.joblib")
VECTORIZER_PATH = os.getenv("VECTORIZER_PATH", "data/vectorizer.joblib")

try:
    model = joblib.load(MODEL_PATH)
    vectorizer = joblib.load(VECTORIZER_PATH)
except Exception as e:
    print(f"Error loading model: {e}")
    model = None
    vectorizer = None

def preprocess_text(text: str) -> str:
    # Tokenize
    tokens = word_tokenize(text.lower())
    
    # Remove stopwords
    stop_words = set(stopwords.words('english'))
    tokens = [token for token in tokens if token not in stop_words]
    
    return ' '.join(tokens)

@app.post("/analyze")
async def analyze_query(query: Query) -> Dict[str, Any]:
    if model is None or vectorizer is None:
        raise HTTPException(status_code=500, detail="ML model not loaded")
    
    try:
        # Preprocess the query
        processed_text = preprocess_text(query.text)
        
        # Transform the text
        X = vectorizer.transform([processed_text])
        
        # Get prediction and probability
        prediction = model.predict(X)[0]
        probability = max(model.predict_proba(X)[0])
        
        # Get response based on intent
        response = get_response(prediction, query.text)
        
        return {
            "intent": prediction,
            "confidence": float(probability),
            "response": response
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing query: {str(e)}")

def get_response(intent: str, original_query: str) -> str:
    # Simple response mapping - can be expanded based on needs
    responses = {
        "greeting": "Hello! How can I help you today?",
        "farewell": "Goodbye! Have a great day!",
        "question": f"I understand you're asking about: {original_query}",
        "statement": f"I understand you're saying: {original_query}",
        "unknown": "I'm not sure I understand. Could you rephrase that?"
    }
    return responses.get(intent, responses["unknown"])

@app.get("/health")
async def health_check():
    return {"status": "healthy", "model_loaded": model is not None} 