from __future__ import annotations

import os
from pathlib import Path

APP_NAME = "Bank Churn Prediction API"
APP_VERSION = "1.0.0"
BACKEND_ROOT = Path(__file__).resolve().parents[2]
MODEL_PATH = Path(os.getenv("MODEL_PATH", BACKEND_ROOT / "final_pipeline.pkl"))
DEFAULT_CORS_ORIGINS = [
    origin.strip()
    for origin in os.getenv(
        "CORS_ORIGINS",
        "http://localhost:5173,http://127.0.0.1:5173",
    ).split(",")
    if origin.strip()
]
