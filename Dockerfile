FROM node:18-alpine

# Create app directory
WORKDIR /app

# Install app dependencies (production only)
COPY package.json ./
RUN npm ci --only=production

# Copy app source
COPY . .

ENV NODE_ENV=production
EXPOSE 5000

# Start the server
CMD ["node", "server.js"]

