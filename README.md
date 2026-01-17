# Root README.md

# Paytm Clone – Turborepo Monorepo

This repository contains a **Paytm-like payments platform** built using a **Turborepo monorepo** architecture. It includes multiple Next.js applications, shared packages, and backend services, all orchestrated using **pnpm**, **Turbo**, and **Docker**.

The project is designed to be **production-ready**, with optimized Docker builds, Prisma integration, and standard Next.js build Next.js deployments.

---

## 🏗️ Monorepo Structure

```
.
├── apps/
│   ├── user-app/          # User-facing Next.js application
│   ├── merchant-app/      # Merchant dashboard Next.js application
│   └── bank-webhook/      # Backend webhook service (Node.js)
│
├── packages/
│   ├── db/                # Prisma + database access layer
│   ├── ui/                # Shared UI components
│   ├── eslint-config/     # Shared ESLint configuration
│   └── typescript-config/ # Shared tsconfig base
│
├── docker-compose.yml
├── Dockerfile
├── pnpm-workspace.yaml
└── turbo.json
```

---

## 🚀 Tech Stack

* **Monorepo:** Turborepo
* **Frontend:** Next.js 14 (App Router, Standalone output)
* **Backend:** Node.js (Webhook service)
* **Database:** PostgreSQL + Prisma
* **Package Manager:** pnpm
* **Containerization:** Docker & Docker Compose
* **Language:** TypeScript

---

## 🧠 Applications

| App            | Description                         | Port   |
| -------------- | ----------------------------------- | ------ |
| `user-app`     | User-facing Paytm-style application | `3001` |
| `merchant-app` | Merchant dashboard                  | `3000` |
| `bank-webhook` | Backend webhook listener            | `3003` |

---

## 🧑‍💻 Local Development (Without Docker)

```bash
pnpm install
pnpm dev
```

---

## 🐳 Running with Docker (Recommended)

```bash
docker compose build --no-cache
docker compose up
```

* User App → [http://localhost:3001](http://localhost:3001)
* Merchant App → [http://localhost:3000](http://localhost:3000)
* Bank Webhook → [http://localhost:3003](http://localhost:3003)

---

## 🔐 Environment Variables Setup (`.env.local`)

Each application and service **maintains its own environment file**.  
Environment files are **not committed to version control** and must be created manually.

### 📍 Where to add `.env.local`

| Location | Purpose |
|--------|--------|
| `apps/user-app/.env.local` | User App environment variables |
| `apps/merchant-app/.env.local` | Merchant App environment variables |
| `apps/bank-webhook/.env` | Webhook service environment variables |
| `packages/db/.env` | Prisma database connection |

---

### 🧪 Example `.env.local` (Next.js Apps)

```env
DATABASE_URL=postgresql://user:password@host:5432/dbname
NEXTAUTH_SECRET=your-secret
NEXTAUTH_URL=http://localhost:3001

| `packages/db/.env` | Prisma database connection |
DATABASE_URL=postgresql://user:password@host:5432/dbname

| `apps/merchant-app/.env.local` | Merchant App environment variables |

DATABASE_URL=postgresql://user:password@host:5432/dbname
NEXTAUTH_SECRET=your-secret
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here

---

## ⚡ Performance Optimizations

* Next.js **standard Next.js build output** for minimal Docker images
* Shared dependency installation in a single build stage
* Optimized Docker layer copying
* Production-only runtime images

---
