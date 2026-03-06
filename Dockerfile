# Deps
FROM node:20.19.0-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

# Dev run
FROM base AS dev
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"]

# Prod build
FROM base AS build
#ARG VITE_API_BASE
#ARG VITE_CRYPTO_KEY
#ENV VITE_API_BASE=$VITE_API_BASE
#ENV VITE_CRYPTO_KEY=$VITE_CRYPTO_KEY
RUN npm run build

# Prod run (nginx)
FROM nginx:1.27-alpine AS prod
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
