FROM node:16-alpine as builder
WORKDIR '/gtamanager'
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx
COPY --from=builder /gtamanager/build/index.html /usr/share/nginx/html
COPY --from=builder /gtamanager/build /usr/share/nginx/html/gtamanager
