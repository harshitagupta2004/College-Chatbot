import json
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.metrics import classification_report
import joblib
import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
import random
import os

# Download required NLTK data
nltk.download('punkt')
nltk.download('stopwords')

def load_data():
    with open('app/data/college_data.json', 'r') as file:
        data = json.load(file)
    return data

def preprocess_text(text):
    # Tokenize
    tokens = word_tokenize(text.lower())
    
    # Remove stopwords
    stop_words = set(stopwords.words('english'))
    tokens = [token for token in tokens if token not in stop_words]
    
    return ' '.join(tokens)

def prepare_training_data(data):
    texts = []
    labels = []
    
    for intent in data['intents']:
        for pattern in intent['patterns']:
            texts.append(preprocess_text(pattern))
            labels.append(intent['tag'])
    
    return texts, labels

def train_model():
    # Load data
    data = load_data()
    
    # Prepare training data
    texts, labels = prepare_training_data(data)
    
    # Split the data
    X_train, X_test, y_train, y_test = train_test_split(
        texts, labels, test_size=0.2, random_state=42
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
    joblib.dump(model, 'model.joblib')
    joblib.dump(vectorizer, 'vectorizer.joblib')
    
    # Save the intents data for response generation
    joblib.dump(data, 'intents.joblib')
    
    print("\nModel and data saved successfully!")

if __name__ == "__main__":
    train_model() 