from __future__ import annotations

from typing import Literal

from pydantic import BaseModel, Field


class PredictionRequest(BaseModel):
    CreditScore: int = Field(ge=300, le=900, description="Customer credit score")
    Geography: Literal["France", "Germany", "Spain"]
    Gender: Literal["Male", "Female"]
    Age: int = Field(ge=18, le=100, description="Customer age")
    Tenure: int = Field(ge=0, le=50, description="Years with the bank")
    Balance: float = Field(ge=0, description="Current account balance")
    NumOfProducts: int = Field(ge=1, le=10, description="Number of bank products")
    HasCrCard: int = Field(ge=0, le=1, description="Whether the customer owns a credit card")
    IsActiveMember: int = Field(ge=0, le=1, description="Whether the customer is active")
    EstimatedSalary: float = Field(ge=0, description="Estimated salary")


class PredictionResponse(BaseModel):
    prediction: str
    probability: float
    confidence: float
    risk_level: str
