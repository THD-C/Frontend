FROM node:20.11.1 as build
ARG TEMPO_URL="http://localhost:1234/v1/traces"
ARG API_URL="http://localhost:8000/api"

WORKDIR /usr/local/app
COPY ./ /usr/local/app/
RUN echo "{\n\t\"tempoUrl\": \"${TEMPO_URL}\",\n\t\"apiUrl\": \"${API_URL}\"\n}" > "/usr/local/app/public/config.json"
RUN npm install
RUN npm run build

FROM nginx:latest
COPY --from=build /usr/local/app/dist/browser /usr/share/nginx/html
COPY --from=build /usr/local/app/configs/nginx.conf /etc/nginx/
EXPOSE 80
