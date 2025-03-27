import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.metrics import classification_report
import joblib
import os

# Sample training data - replace with your actual training data
training_data = [
    {"text": "hello", "intent": "greeting"},
    {"text": "hi there", "intent": "greeting"},
    {"text": "goodbye", "intent": "farewell"},
    {"text": "see you later", "intent": "farewell"},
    {"text": "what is the weather", "intent": "question"},
    {"text": "how are you", "intent": "question"},
    {"text": "the sky is blue", "intent": "statement"},
    {"text": "I like pizza", "intent": "statement"},
]

def train_model():
    # Convert training data to DataFrame
    df = pd.DataFrame(training_data)
    
    # Split the data
    X_train, X_test, y_train, y_test = train_test_split(
        df['text'], df['intent'], test_size=0.2, random_state=42
    )
    
    # Create and fit the vectorizer
    vectorizer = TfidfVectorizer(max_features=1000)
    X_train_vec = vectorizer.fit_transform(X_train)
    X_test_vec = vectorizer.transform(X_test)
    
    # Train the model
    model = MultinomialNB()
    model.fit(X_train_vec, y_train)
    
    # Evaluate the model
    y_pred = model.predict(X_test_vec)
    print("\nClassification Report:")
    print(classification_report(y_test, y_pred))
    
    # Save the model and vectorizer
    os.makedirs("data", exist_ok=True)
    joblib.dump(model, "data/model.joblib")
    joblib.dump(vectorizer, "data/vectorizer.joblib")
    
    print("\nModel and vectorizer saved successfully!")

if __name__ == "__main__":
    train_model() 