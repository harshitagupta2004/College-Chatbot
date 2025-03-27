from flask import Flask, request, jsonify
from flask_cors import CORS
import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
import joblib
import random
import json
import os
from dotenv import load_dotenv

# Download required NLTK data
nltk.download('punkt')
nltk.download('stopwords')

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

# Get the absolute path to the app directory
APP_DIR = os.path.dirname(os.path.abspath(__file__))

# Load the trained model and vectorizer
try:
    model_path = os.path.join(APP_DIR, 'chatbot_model.joblib')
    vectorizer_path = os.path.join(APP_DIR, 'vectorizer.joblib')
    
    model = joblib.load(model_path)
    vectorizer = joblib.load(vectorizer_path)
    print("Model and vectorizer loaded successfully!")
except Exception as e:
    print(f"Error loading model: {e}")
    model = None
    vectorizer = None

def preprocess_text(text):
    # Tokenize
    tokens = word_tokenize(text.lower())
    
    # Remove stopwords
    stop_words = set(stopwords.words('english'))
    tokens = [token for token in tokens if token not in stop_words]
    
    return ' '.join(tokens)

def get_response(intent):
    # Load the original intents data
    try:
        intents_path = os.path.join(os.path.dirname(APP_DIR), '..', 'ml_service', 'College-Chatbot-Using-ML-and-NLP', 'dataset', 'intents1.json')
        with open(intents_path, 'r') as f:
            intents_data = json.load(f)
            
        # Find the matching intent in the data
        for intent_data in intents_data['intents']:
            if intent_data['tag'] == intent:
                return random.choice(intent_data['responses'])
    except Exception as e:
        print(f"Error loading intents data: {e}")
        
    # Fallback responses if intent not found
    fallback_responses = {
        "admission": "For detailed admission information, please visit our college website.",
        "courses": "The college offers courses in Information Technology, Computer Engineering, Mechanical Engineering, Chemical Engineering, and Civil Engineering.",
        "fees": "For detailed fee information, please visit our college website.",
        "campus": "Our campus features modern classrooms, well-equipped laboratories, a library, sports facilities, and student housing.",
        "greeting": "Hello! How can I help you today?",
        "goodbye": "Goodbye! Feel free to ask more questions anytime."
    }
    
    return fallback_responses.get(intent, "I'm not sure I understand. Could you rephrase that?")

@app.route('/api/chat', methods=['POST'])
def chat():
    if model is None or vectorizer is None:
        return jsonify({"error": "ML model not loaded"}), 500
    
    try:
        data = request.get_json()
        message = data.get('message', '')
        
        if not message:
            return jsonify({"error": "No message provided"}), 400
        
        # Preprocess the message
        processed_text = preprocess_text(message)
        
        # Transform the text
        X = vectorizer.transform([processed_text])
        
        # Get prediction and probability
        prediction = model.predict(X)[0]
        probability = max(model.predict_proba(X)[0])
        
        # Get response based on intent
        response = get_response(prediction)
        
        return jsonify({
            "status": "success",
            "intent": prediction,
            "confidence": float(probability),
            "response": response
        })
    except Exception as e:
        print(f"Error in chat endpoint: {e}")
        return jsonify({"error": str(e)}), 500

@app.route('/health')
def health_check():
    return jsonify({
        "status": "healthy",
        "model_loaded": model is not None,
        "vectorizer_loaded": vectorizer is not None
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8001, debug=True) 