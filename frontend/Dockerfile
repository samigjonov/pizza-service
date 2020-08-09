### STAGE 1: Build ###
FROM node:12.7-alpine AS frontend
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

### STAGE 2: Run ###
FROM nginx:1.17.1-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=frontend /usr/src/app/dist /usr/share/nginx/html
