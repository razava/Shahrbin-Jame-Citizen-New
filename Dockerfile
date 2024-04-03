# # Stage 1: Build the React app
# FROM node:18-alpine AS builder
# ENV REACT_APP_BASENAME=/137
# ENV REACT_APP_API_URL_DEV=https://shahrbin2.yazd.ir/api
# ENV PUBLIC_URL=https://shahrbin2.yazd.ir/137
# ENV REACT_APP_SIGNALR_URL=https://shahrbin2.yazd.ir
# ENV NODE_ENV=production
# WORKDIR /app
# COPY package.json .
# RUN npm install --force
# COPY . .
# RUN npm run build
# # Stage 2: Create the production image
# FROM nginx:latest
# COPY --from=builder /app/build /usr/share/nginx/html
# EXPOSE 3000
# CMD ["nginx", "-g", "daemon off;"]

# Use a base image with Node.js installed
FROM node:18-alpine as build

# Set environment variables
ENV REACT_APP_BASENAME=/137
ENV REACT_APP_API_URL_DEV=https://shahrbin2.yazd.ir/api
ENV PUBLIC_URL=https://shahrbin2.yazd.ir/137
ENV REACT_APP_SIGNALR_URL=https://shahrbin2.yazd.ir
ENV NODE_ENV=production
# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install --force --production

# Copy the rest of the application code
COPY . .

# Build the React app for production
RUN npm run build

# Use a lightweight Node.js image for the production environment
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the built React app from the build stage
COPY --from=build /app/build ./build

# Expose the port that the React app will run on
EXPOSE 3000

# Command to run the React app in production mode
CMD ["npx", "serve", "-s", "build"]
