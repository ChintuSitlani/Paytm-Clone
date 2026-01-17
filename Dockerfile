# ---------------- BASE (BUILD) ----------------
    FROM node:20-slim AS base
    WORKDIR /app
    
    # ❗ DO NOT set NODE_ENV=production here
    ENV NODE_OPTIONS="--max-old-space-size=4096"
    
    RUN corepack enable && corepack prepare pnpm@9.15.0 --activate
    
    COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
    COPY packages ./packages
    COPY apps ./apps
    
    # Installs devDependencies (Prisma included)
    RUN pnpm install --frozen-lockfile
    
    
    # ---------------- USER APP ----------------
    FROM base AS user-app-build
    WORKDIR /app/apps/user-app
    RUN pnpm build
    
    FROM node:20-slim AS user-app
    WORKDIR /app
    ENV NODE_ENV=production
    
    # 🔴 REQUIRED for Prisma
    RUN apt-get update \
     && apt-get install -y openssl \
     && rm -rf /var/lib/apt/lists/*
    
    RUN corepack enable && corepack prepare pnpm@9.15.0 --activate
    
    COPY --from=user-app-build /app /app
    WORKDIR /app/apps/user-app
    EXPOSE 3001
    CMD ["pnpm","run","start"]
    
    
    # ---------------- MERCHANT APP ----------------
    FROM base AS merchant-app-build
    WORKDIR /app/apps/merchant-app
    RUN pnpm build
    
    FROM node:20-slim AS merchant-app
    WORKDIR /app
    ENV NODE_ENV=production
    
    # 🔴 REQUIRED for Prisma
    RUN apt-get update \
     && apt-get install -y openssl \
     && rm -rf /var/lib/apt/lists/*
    
    RUN corepack enable && corepack prepare pnpm@9.15.0 --activate
    
    COPY --from=merchant-app-build /app /app
    WORKDIR /app/apps/merchant-app
    EXPOSE 3000
    CMD ["pnpm","run","start"]
    
    
    # ---------------- BANK WEBHOOK ----------------
    FROM base AS bank-webhook-build
    WORKDIR /app/apps/bank-webhook
    RUN pnpm build
    
    FROM node:20-slim AS bank-webhook
    WORKDIR /app
    ENV NODE_ENV=production
    
    # 🔴 REQUIRED for Prisma
    RUN apt-get update \
     && apt-get install -y openssl \
     && rm -rf /var/lib/apt/lists/*
    
    RUN corepack enable && corepack prepare pnpm@9.15.0 --activate
    
    COPY --from=bank-webhook-build /app /app
    WORKDIR /app/apps/bank-webhook
    EXPOSE 3003
    CMD ["pnpm","run","start"]
    