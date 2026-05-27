from __future__ import annotations

from typing import Dict, Any

import pandas as pd

from app.schemas.prediction import PredictionRequest


def get_age_group(age: int) -> str:
    if age <= 30:
        return "Young"
    if age <= 40:
        return "Adult"
    if age <= 50:
        return "MidAge"
    if age <= 60:
        return "Senior"
    return "Old"


def get_tenure_group(tenure: int) -> str:
    if tenure <= 3:
        return "Low"
    if tenure <= 6:
        return "Medium"
    return "High"


def build_model_frame(payload: PredictionRequest) -> pd.DataFrame:
    data: Dict[str, Any] = payload.dict()
    data["BalancePerProduct"] = float(data["Balance"]) / (int(data["NumOfProducts"]) + 1)
    data["AgeGroup"] = get_age_group(int(data["Age"]))
    data["TenureGroup"] = get_tenure_group(int(data["Tenure"]))
    return pd.DataFrame([data])
