from __future__ import annotations

import os
from typing import Any

from fastapi import FastAPI, Request
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.api.routes import router as churn_router

APP_NAME = "Bank Churn Prediction API"
APP_VERSION = "1.0.0"
DEFAULT_ORIGINS = "http://localhost:5173,http://127.0.0.1:5173"


def build_cors_origins() -> list[str]:
    raw_value = os.getenv("CORS_ORIGINS", DEFAULT_ORIGINS)
    return [origin.strip() for origin in raw_value.split(",") if origin.strip()]


app = FastAPI(
    title=APP_NAME,
    version=APP_VERSION,
    description="Production-ready API for bank churn prediction.",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=build_cors_origins(),
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(_: Request, exc: RequestValidationError) -> JSONResponse:
    return JSONResponse(
        status_code=422,
        content={
            "detail": "Request validation failed.",
            "errors": exc.errors(),
        },
    )


@app.exception_handler(Exception)
async def unhandled_exception_handler(_: Request, exc: Exception) -> JSONResponse:
    return JSONResponse(
        status_code=500,
        content={
            "detail": "Internal server error.",
            "error": str(exc),
        },
    )


@app.get("/")
def root() -> dict[str, Any]:
    return {
        "service": APP_NAME,
        "version": APP_VERSION,
        "health": "/health",
        "predict": "/predict",
        "docs": "/docs",
    }


app.include_router(churn_router)


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
