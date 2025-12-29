# Use an official Bun runtime as a base image
FROM oven/bun:1 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and bun.lock
COPY package.json bun.lock ./

# Install dependencies
RUN bun install

# Copy the rest of the application
COPY . .

# Build the Angular application
RUN bun run build

# Use a lightweight Nginx image for the runtime
FROM nginx:alpine

# Copy the built application from the build stage
COPY --from=build /app/dist/front/browser /usr/share/nginx/html

# Copy the Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]