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

# Production stage
FROM oven/bun:latest AS production

WORKDIR /app

# Copy only production dependencies
COPY --from=prod-deps /app/node_modules ./node_modules

# Copy source code (Bun runs TypeScript natively)
COPY . .

EXPOSE 3000

ENV NODE_ENV=production

CMD [ "bun", "run", "start" ]

