from __future__ import annotations

from fastapi import APIRouter, HTTPException

from app.schemas.prediction import PredictionRequest, PredictionResponse
from app.services.model_service import load_model, predict_customer

router = APIRouter(tags=["Bank Churn Prediction"])


@router.get("/health")
def health_check() -> dict[str, str]:
    try:
        load_model()
    except Exception as exc:  # pragma: no cover - surfaced to API consumers
        raise HTTPException(status_code=503, detail=f"Model unavailable: {exc}") from exc
    return {"status": "healthy", "model": "loaded"}


@router.post("/predict", response_model=PredictionResponse)
def predict(payload: PredictionRequest) -> PredictionResponse:
    try:
        return predict_customer(payload)
    except HTTPException:
        raise
    except Exception as exc:  # pragma: no cover - surfaced to API consumers
        raise HTTPException(status_code=500, detail=str(exc)) from exc
