Vercel deployment notes

This repository is structured for a Git-based deployment to Vercel with the frontend as a static site and the backend as Python serverless functions.

What I added

- `vercel.json` — instructs Vercel to build the frontend and deploy Python serverless functions from `api/`.
- `api/predict.py` and `api/health.py` — lightweight Flask handlers that reuse the existing backend logic in `Bank_Churn_Project/backend`.
- `api/requirements.txt` — Python dependencies for the serverless functions.
- Updated frontend API client to use `http://127.0.0.1:8000` in dev and `/api` in production.

Recommended Vercel setup (Git-based):

1. Push this repository to GitHub (or GitLab/Bitbucket).
2. Go to https://vercel.com/new and import the repository.
3. On the project settings, set Environment Variables:
   - `VITE_API_BASE_URL` (optional): If you want to override the API base, set it to `/api`.
4. Vercel will detect `vercel.json` and run two builds:
   - Frontend: `Bank_Churn_Project/frontend/package.json` via `@vercel/static-build` (runs `npm run build`).
   - Functions: `api/*.py` via `@vercel/python` (installs `api/requirements.txt`).

Notes & caveats

- Model artifact: `Bank_Churn_Project/backend/final_pipeline.pkl` is referenced by the serverless functions via a sys.path insertion. Because it is currently under `Bank_Churn_Project/backend`, it will be uploaded with the repo and available at runtime. If the model becomes large (>50MB), Vercel serverless functions may hit size limits — consider moving the model to external storage (S3) or using a container deployment.

- Local testing: You can run `vercel dev` locally (requires the Vercel CLI) to emulate the Vercel environment. Alternatively, run the backend locally (`python -m uvicorn main:app`) and the frontend with `npm run dev`.

Commands

```bash
# Frontend build (Vite)
cd Bank_Churn_Project/frontend
npm install
npm run build

# Test backend locally
cd Bank_Churn_Project/backend
python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000

# Test full monorepo with Vercel CLI
npx vercel dev
```

If you want, I can:
- Run `npx vercel dev` here to confirm the integrated behavior locally.
- Move `final_pipeline.pkl` into `api/` for a simpler function path.
- Add a small root `package.json` and CI workflow to run tests and builds.
