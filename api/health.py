import os
import sys
from flask import Flask, jsonify

# Make backend importable
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
BACKEND_PATH = os.path.join(ROOT, 'Bank_Churn_Project', 'backend')
if BACKEND_PATH not in sys.path:
    sys.path.insert(0, BACKEND_PATH)

app = Flask(__name__)


@app.route('/', methods=['GET'])
def health():
    try:
        from app.services.model_service import load_model

        # attempt to load model to ensure it's present
        _ = load_model()
        return jsonify({"status": "healthy", "model": "loaded"}), 200
    except Exception as exc:
        return jsonify({"status": "error", "error": str(exc)}), 500


if __name__ == '__main__':
    app.run(debug=True)
