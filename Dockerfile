FROM node:20.11.1 as build
WORKDIR /usr/local/app
COPY ./ /usr/local/app/
COPY ./public/config.example.json /usr/local/app/public/config.json
RUN npm install
RUN npm run build

FROM nginx:latest
COPY --from=build /usr/local/app/dist/browser /usr/share/nginx/html
COPY --from=build /usr/local/app/configs/nginx.conf /etc/nginx/
EXPOSE 80
