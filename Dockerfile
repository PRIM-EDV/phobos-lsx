# ----------------------
# Base dependencies layer
# ----------------------
FROM node:24.1.0-slim AS deps
RUN apt update && apt install python3 build-essential protobuf-compiler alsa-utils libasound2-dev -y

WORKDIR /opt/phobos-lsx

# Copy root lerna workspace files
COPY package*.json ./
COPY lerna*.json ./

# Copy workspace app' package.json files
COPY apps/backend/package.json ./apps/backend/
COPY apps/frontend/package.json ./apps/frontend/

# Copy all libraries
COPY libs ./libs

RUN npm install

# ----------------------
# Frontend build
# ----------------------
FROM deps AS frontend
COPY apps/frontend ./apps/frontend
RUN npx lerna run build --scope @phobos-lsx/frontend --include-dependencies

# ----------------------
# Backend build
# ----------------------
FROM deps AS backend
COPY apps/backend ./apps/backend
RUN npx lerna run build --scope @phobos-lsx/backend --include-dependencies

# ----------------------
# Image
# ----------------------
FROM backend

WORKDIR /opt/phobos-lsx
COPY --from=frontend /opt/phobos-lsx/apps/frontend/dist/phobos-lsx/browser ./apps/backend/dist/public

# Run startscript
COPY ./docker-entrypoint.sh ./
RUN chmod +x docker-entrypoint.sh

CMD ["./docker-entrypoint.sh"]