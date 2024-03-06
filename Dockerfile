FROM node:alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build --prod

FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=builder /app/dist/* /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
