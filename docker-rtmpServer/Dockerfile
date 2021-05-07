FROM dvdgiessen/nginx-rtmp-docker
COPY . .
COPY /conf/mime.types /etc/nginx/mime.types
COPY /conf/nginx.conf /etc/nginx/nginx.conf
COPY /html/index.html /var/www/index.html

RUN apk add ffmpeg