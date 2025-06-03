# Stage 1: Builder
FROM node:20 AS builder
WORKDIR /usr/src/app

# Copy package files and install all dependencies (including dev)
COPY package.json package-lock.json* ./
RUN npm ci

# Copy the rest of the application source code
COPY . .

# Run the build script (builds backend TS to JS, and frontend React app)
RUN npm run build
RUN ls -R /usr/src/app/dist
# At this point, we have:
# - ./dist/be (compiled backend)
# - ./dist/fe (static frontend assets)

# Prune devDependencies from node_modules
RUN npm prune --omit=dev

# Stage 2: Runner
FROM node:20-alpine AS runner
WORKDIR /usr/src/app
ENV NODE_ENV=production

# Copy production dependencies from the builder stage
COPY --from=builder /usr/src/app/node_modules ./node_modules

# Copy compiled backend and frontend static assets
COPY --from=builder /usr/src/app/dist ./dist

# Copy package.json (it might be needed for `npm start`)
COPY --from=builder /usr/src/app/package.json . 

# The Express app should listen on a port, e.g., 3000 or from process.env.PORT
EXPOSE 3000
CMD ["npm", "start"]
