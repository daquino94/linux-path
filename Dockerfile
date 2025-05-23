# ----------- Stage 1: Build the Next.js app -----------

FROM node:24-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

RUN npm run build

# ----------- Stage 2: Prepare the final image -----------

FROM node:24-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production


COPY package.json package-lock.json ./
RUN npm ci --only=production


COPY --from=builder /app/.next .next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/tsconfig.json ./
# COPY --from=builder /app/.env ./


EXPOSE 3000

CMD ["npm", "start"]
