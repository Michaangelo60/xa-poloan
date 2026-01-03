FROM node:18-alpine AS deps
WORKDIR /usr/src/app
COPY backend/package*.json ./backend/
RUN cd backend && npm ci --only=production

FROM node:18-alpine
WORKDIR /usr/src/app
COPY --from=deps /usr/src/app/backend/node_modules ./backend/node_modules
COPY . .
ENV NODE_ENV=production
EXPOSE 5000
CMD ["node", "backend/server.js"]
