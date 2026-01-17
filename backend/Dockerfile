# Multi-stage Dockerfile for xapobank backend
# Builder stage: install dependencies
FROM node:18-alpine AS builder
WORKDIR /app

# Install dependencies (use package-lock.json when present)
COPY package*.json ./
RUN npm ci --only=production || npm install --only=production

# Copy source
COPY . .

# Runtime stage: minimal image with production deps only
FROM node:18-alpine
WORKDIR /app

ENV NODE_ENV=production

# Copy app files and production node_modules from builder
COPY --from=builder /app .

# Create non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup || true
USER appuser

# Document the port the app listens on (optional)
EXPOSE 5000

# Healthcheck hits the lightweight health endpoint
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s CMD wget -qO- http://localhost:5000/api/health || exit 1

# Start command — server reads PORT from environment
CMD ["node", "server.js"]
