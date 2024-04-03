# Stage 1: Build the React app
FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json .
RUN npm install --force
COPY . .
RUN npm run build
# Stage 2: Create the production image
FROM nginx:latest
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]