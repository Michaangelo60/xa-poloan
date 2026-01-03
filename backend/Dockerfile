# Root Dockerfile to make Render locate the Dockerfile when building from repo root.
# It builds the app from the `backend` folder and runs the backend server.

FROM node:18-alpine AS builder
WORKDIR /app

# Install production dependencies for the backend
COPY backend/package*.json ./backend/
RUN cd backend && npm ci --only=production

# Copy backend source
COPY backend ./backend

# Final image
FROM node:18-alpine
WORKDIR /app

ENV NODE_ENV=production

# Copy backend artifacts from builder
COPY --from=builder /app/backend /app

# Create non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup || true
USER appuser

EXPOSE 5000

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s CMD wget -qO- http://localhost:5000/api/health || exit 1

CMD ["node", "server.js"]
