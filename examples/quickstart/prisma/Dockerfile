
FROM node:20-slim as builder

# Create app directory
WORKDIR /app

# Install app dependencies

RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential node-gyp openssl pkg-config python-is-python3

COPY package*.json ./

RUN npm ci

# Bundle app source
COPY . .
RUN npx prisma generate
COPY ./prisma prisma

## Production image
FROM node:20-slim as production

# Install packages needed for deployment
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y openssl && \
    rm -rf /var/lib/apt/lists /var/cache/apt/archives

WORKDIR /app
ENV NODE_ENV production

COPY package*.json ./
RUN npm ci --only=production --quiet

COPY --from=builder /app /app
RUN npx prisma generate
COPY --from=builder /app/prisma /app/prisma

EXPOSE 3001
CMD ["npm", "run", "start"]

