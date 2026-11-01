#!/bin/sh
set -e

# only these variables are substituted: nginx's own $host, $remote_addr ... must stay as they are
envsubst '${LISTEN_PORT} ${APP_HOST} ${APP_PORT}' < /etc/nginx/default.conf.tpl > /etc/nginx/conf.d/default.conf
exec nginx -g 'daemon off;'
