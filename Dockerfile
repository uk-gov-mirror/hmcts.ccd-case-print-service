# ---- Base Image ----
FROM hmctspublic.azurecr.io/base/node/stretch-slim-lts-8 as base
USER root
RUN apt-get update \
  && apt-get install -y bzip2 patch --no-install-recommends \
  && rm -rf /var/lib/apt/lists/*
COPY package.json yarn.lock .snyk ./
RUN yarn install

# ---- Build Image ----
FROM base as build
COPY src/main ./src/main
COPY config ./config
COPY gulpfile.js tsconfig.json ./
RUN yarn sass \
  && yarn install --production

# ---- Runtime Image ----
FROM hmctspublic.azurecr.io/base/node/stretch-slim-lts-8 as runtime
COPY --from=build $WORKDIR .
EXPOSE 3100
