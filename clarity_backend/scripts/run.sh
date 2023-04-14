#!/bin/sh 
set -e 

python manage.py collectstatic --noinput
python manage.py migrate

gunicorn clarity.wsgi:application --bind :9000 --workers 4 --threads 2
