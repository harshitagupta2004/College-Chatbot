# QueryAI

A full-stack AI query processing system with frontend, backend, and ML components.

## Project Structure

```
QueryAI/
├── frontend/          # Next.js frontend
├── backend/          # FastAPI backend service
└── ml_service/       # ML service for intent classification
```

## Setup Instructions

### Frontend (Next.js)
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
   The frontend will be available at http://localhost:3000

### Backend Service
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run the backend server:
   ```bash
   uvicorn src.main:app --reload --port 8000
   ```
   The backend will be available at http://localhost:8000

### ML Service
1. Navigate to the ML service directory:
   ```bash
   cd ml_service
   ```
2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Train the model:
   ```bash
   python src/train.py
   ```
5. Run the ML service:
   ```bash
   uvicorn src.main:app --reload --port 8001
   ```
   The ML service will be available at http://localhost:8001

## Environment Variables

Create a `.env` file in both backend and ml_service directories:

### Backend (.env)
```
ML_SERVICE_URL=http://localhost:8001
```

### ML Service (.env)
```
MODEL_PATH=data/model.joblib
VECTORIZER_PATH=data/vectorizer.joblib
```

## API Endpoints

### Backend Service
- POST `/api/process-query`: Process user queries
- GET `/health`: Health check endpoint

### ML Service
- POST `/analyze`: Analyze text and return intent classification
- GET `/health`: Health check endpoint

## How It Works

1. The frontend sends user queries to the backend service
2. The backend service forwards the query to the ML service
3. The ML service processes the query using the trained model to:
   - Identify the intent
   - Calculate confidence score
   - Generate appropriate response
4. The response is sent back through the backend to the frontend

## Customizing the ML Model

To customize the ML model:
1. Modify the training data in `ml_service/src/train.py`
2. Retrain the model by running the training script
3. The new model will be automatically loaded by the ML service 