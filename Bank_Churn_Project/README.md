# Bank Churn Project

A complete full-stack bank churn prediction application built with a FastAPI backend, a React + Vite frontend, and the trained `final_pipeline.pkl` model artifact from the notebook workflow.

## Project Structure

```text
Bank_Churn_Project/
├── backend/
│   ├── app/
│   ├── main.py
│   ├── final_pipeline.pkl
│   └── requirements.txt
├── frontend/
│   ├── src/
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── README.md
└── .gitignore
```

## Backend

The backend exposes:

- `GET /health` for readiness checks
- `POST /predict` for churn prediction
- FastAPI auto docs at `/docs` and `/redoc`

The request body supports the following fields:

- `CreditScore`
- `Geography`
- `Gender`
- `Age`
- `Tenure`
- `Balance`
- `NumOfProducts`
- `HasCrCard`
- `IsActiveMember`
- `EstimatedSalary`

The server automatically engineers:

- `BalancePerProduct = Balance / (NumOfProducts + 1)`
- `AgeGroup`
- `TenureGroup`

### Backend run command

```bash
cd Bank_Churn_Project/backend
python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

## Frontend

The frontend is a responsive dashboard built with React and Vite. It includes:

- glassmorphism cards
- gradient background
- responsive layout
- loading state while prediction runs
- validation and reset flow
- result cards with probability and risk level

### Frontend run command

```bash
cd Bank_Churn_Project/frontend
npm install
npm run dev
```

If your backend runs on a different URL, set:

```bash
VITE_API_BASE_URL=http://127.0.0.1:8000
```

## End-to-end API Example

```bash
curl -X POST http://127.0.0.1:8000/predict \
  -H "Content-Type: application/json" \
  -d "{
    \"CreditScore\": 650,
    \"Geography\": \"France\",
    \"Gender\": \"Male\",
    \"Age\": 42,
    \"Tenure\": 5,
    \"Balance\": 60000,
    \"NumOfProducts\": 2,
    \"HasCrCard\": 1,
    \"IsActiveMember\": 1,
    \"EstimatedSalary\": 50000
  }"
```

Example response:

```json
{
  "prediction": "Customer Will Exit",
  "probability": 0.87,
  "confidence": 0.87,
  "risk_level": "High Risk"
}
```

## Deployment Notes

- Backend: deploy the FastAPI app on Render, Railway, Fly.io, or a container platform.
- Frontend: deploy the Vite build on Vercel, Netlify, or any static host.
- Set the frontend API URL to the deployed backend.
- Ensure `final_pipeline.pkl` stays inside `backend/`.

## Development Checklist

- Backend CORS is enabled for local React development.
- The model artifact is loaded once and cached.
- Feature engineering matches the training notebook.
- The UI is mobile responsive and production-friendly.
