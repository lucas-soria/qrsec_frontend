# Stage 1: Build
FROM node:22-alpine3.19 AS builder

# Set the working directory in the container
WORKDIR /app

# Declare ENV variables
ARG REACT_APP_WHOLE_FRONTEND_BASE
ARG REACT_APP_WHOLE_BACKEND_BASE
ARG REACT_APP_MAPS_API
ARG REACT_APP_GOOGLE_OAUTH_CLIENT_ID

ENV REACT_APP_WHOLE_FRONTEND_BASE=${REACT_APP_WHOLE_FRONTEND_BASE}
ENV REACT_APP_WHOLE_BACKEND_BASE=${REACT_APP_WHOLE_BACKEND_BASE}
ENV REACT_APP_MAPS_API=${REACT_APP_MAPS_API}
ENV REACT_APP_GOOGLE_OAUTH_CLIENT_ID=${REACT_APP_GOOGLE_OAUTH_CLIENT_ID}

# Copy package.json and package-lock.json, yarn.lock and tsconfig.json first for better caching
COPY package*.json ./
COPY yarn.lock ./
COPY tsconfig.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app
RUN npm run build

# Stage 2: Serve the application
FROM nginx:alpine3.19

# Copy custom Nginx configuration
COPY --from=builder /app/nginx.conf /etc/nginx/conf.d/default.conf

# Copy the build output to the Nginx html directory
COPY --from=builder /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
