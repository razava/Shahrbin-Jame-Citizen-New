# Stage 1: Build the React app
FROM node:18-alpine AS builder
ENV REACT_APP_BASENAME=/137
ENV REACT_APP_API_URL_DEV=https://shahrbin2.yazd.ir/api
ENV PUBLIC_URL=https://shahrbin2.yazd.ir/137
ENV REACT_APP_SIGNALR_URL=https://shahrbin2.yazd.ir
ENV NODE_ENV=production
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