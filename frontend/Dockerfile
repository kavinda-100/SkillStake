# Base stage - install dependencies
FROM oven/bun:latest AS deps

WORKDIR /app

# Copy package files
COPY package.json bun.lock ./

# Install all dependencies (for development)
RUN bun install --frozen-lockfile

# Development stage
FROM oven/bun:latest AS development

WORKDIR /app

# Copy node_modules from deps
COPY --from=deps /app/node_modules ./node_modules

# Copy source code
COPY . .

EXPOSE 3000

ENV NODE_ENV=development

CMD [ "bun", "run", "dev" ]

# Production dependencies stage
FROM oven/bun:latest AS prod-deps

WORKDIR /app

COPY package.json bun.lock ./

# Install only production dependencies
RUN bun install --frozen-lockfile --production

# Build stage
FROM oven/bun:latest AS builder

WORKDIR /app

COPY --from=prod-deps /app/node_modules ./node_modules
COPY . .

RUN bun run build

# Production stage
FROM oven/bun:latest AS production

WORKDIR /app

# Copy only production dependencies
COPY --from=prod-deps /app/node_modules ./node_modules

# Copy built application from builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Copy necessary config files
COPY --from=builder /app/next.config.ts ./next.config.ts
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000

ENV NODE_ENV=production

RUN addgroup --system appgroup && adduser --system --ingroup appgroup appuser
USER appuser

CMD [ "bun", "run", "start" ]

