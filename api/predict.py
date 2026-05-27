import os
import sys
from flask import Flask, request, jsonify

# Ensure backend package is importable when deployed
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
BACKEND_PATH = os.path.join(ROOT, 'Bank_Churn_Project', 'backend')
if BACKEND_PATH not in sys.path:
    sys.path.insert(0, BACKEND_PATH)

from app.schemas.prediction import PredictionRequest
from app.services.model_service import predict_customer

app = Flask(__name__)


@app.route('/', methods=['POST'])
def predict():
    try:
        payload = request.get_json(force=True)
        req = PredictionRequest(**payload)
        resp = predict_customer(req)
        return jsonify(resp.model_dump()), 200
    except Exception as exc:
        return jsonify({"detail": str(exc)}), 400


if __name__ == '__main__':
    app.run(debug=True)
