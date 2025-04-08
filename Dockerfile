# === Base stage ===
FROM node:18-alpine AS deps
WORKDIR /app

# Copy only the package files to install dependencies
COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./

# Install dependencies (use the appropriate package manager)
RUN \
  if [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then npm install -g pnpm && pnpm install; \
  elif [ -f yarn.lock ]; then yarn install --frozen-lockfile; \
  fi

# === Build stage ===
FROM node:18-alpine AS builder
WORKDIR /app

# Copy everything
COPY . .

# Copy installed dependencies
COPY --from=deps /app/node_modules ./node_modules

# Build the Next.js app
RUN npm run build

# === Final stage ===
FROM node:18-alpine AS runner
WORKDIR /app

# Only copy necessary files for production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Expose the port (default for Next.js)
EXPOSE 3000

# Set environment variable for production
ENV NODE_ENV=production

# Start the app
CMD ["npm", "start"]
