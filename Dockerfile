# Dependencies
FROM node:20.19.0-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Build
FROM base AS build
ARG VITE_CRYPTO_KEY
ARG VITE_URL
ARG VITE_API_BASE
ARG VITE_INTERNAL_API_BASE
ARG VITE_EMAIL
ENV VITE_CRYPTO_KEY=$VITE_CRYPTO_KEY
ENV VITE_URL=$VITE_URL
ENV VITE_API_BASE=$VITE_API_BASE
ENV VITE_INTERNAL_API_BASE=$VITE_INTERNAL_API_BASE
ENV VITE_EMAIL=$VITE_EMAIL
RUN npm run build

# Production run
FROM node:20.19.0-alpine AS prod
WORKDIR /app
COPY --from=build /app/build ./build
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json
EXPOSE 3000
CMD ["npm", "run", "preview"]
