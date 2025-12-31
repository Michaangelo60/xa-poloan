# XapoBank Backend (minimal scaffold)

This folder contains a minimal Express + Mongoose backend scaffold used by the frontend in this workspace.

Quick start (from `backend`):

```
npm install
# set environment variables (MONGO_URI, JWT_SECRET) or create a .env file
npm start
```

APIs implemented:
- `POST /api/auth/login`
- `POST /api/auth/register`
- `GET /api/auth/me` (requires Authorization: Bearer <token>)
- `GET /api/transactions`
- `POST /api/transactions` (requires Authorization header)
