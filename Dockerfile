FROM httpd:alpine

COPY ./index.html /usr/local/apache2/htdocs/index.html
COPY ./favicon.ico /usr/local/apache2/htdocs/favicon.ico
COPY ./js /usr/local/apache2/htdocs/js
COPY ./assets /usr/local/apache2/htdocs/assets