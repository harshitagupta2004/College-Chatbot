from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import httpx
from typing import Dict, Any
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="QueryAI Backend")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ML Service URL
ML_SERVICE_URL = os.getenv("ML_SERVICE_URL", "http://localhost:8001")

class Query(BaseModel):
    text: str

@app.post("/api/process-query")
async def process_query(query: Query) -> Dict[str, Any]:
    try:
        # Forward the query to ML service
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{ML_SERVICE_URL}/analyze",
                json={"text": query.text}
            )
            response.raise_for_status()
            result = response.json()
            
            return {
                "status": "success",
                "intent": result.get("intent"),
                "confidence": result.get("confidence"),
                "response": result.get("response")
            }
    except httpx.HTTPError as e:
        raise HTTPException(status_code=500, detail=f"ML service error: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

@app.get("/health")
async def health_check():
    return {"status": "healthy"} 