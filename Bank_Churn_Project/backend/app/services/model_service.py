from __future__ import annotations

from functools import lru_cache
from pathlib import Path
from typing import Any

import joblib

from app.schemas.prediction import PredictionRequest, PredictionResponse
from app.utils.feature_engineering import build_model_frame

MODEL_PATH = Path(__file__).resolve().parents[2] / "final_pipeline.pkl"


@lru_cache(maxsize=1)
def load_model() -> Any:
    if not MODEL_PATH.exists():
        raise FileNotFoundError(f"Model artifact not found at {MODEL_PATH}")
    return joblib.load(MODEL_PATH)


def get_risk_level(probability: float) -> str:
    if probability >= 0.75:
        return "High Risk"
    if probability >= 0.45:
        return "Medium Risk"
    return "Low Risk"


def get_positive_class_probability(model: Any, feature_frame) -> float:
    probabilities = model.predict_proba(feature_frame)[0]
    classes = list(getattr(model, "classes_", []))
    if 1 in classes:
        positive_index = classes.index(1)
    elif len(probabilities) > 1:
        positive_index = 1
    else:
        positive_index = 0
    return float(probabilities[positive_index])


def predict_customer(payload: PredictionRequest) -> PredictionResponse:
    model = load_model()
    feature_frame = build_model_frame(payload)
    prediction_value = int(model.predict(feature_frame)[0])
    churn_probability = get_positive_class_probability(model, feature_frame)
    confidence = churn_probability if prediction_value == 1 else 1.0 - churn_probability

    return PredictionResponse(
        prediction="Customer Will Exit" if prediction_value == 1 else "Customer Will Stay",
        probability=round(churn_probability, 4),
        confidence=round(confidence, 4),
        risk_level=get_risk_level(churn_probability),
    )
