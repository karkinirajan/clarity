server {
    listen 80;
    server_name 100.26.142.5;

    location / {
        proxy_pass http://backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    location /static/ {
        alias /code/static/;
    }

    location /media/ {
        alias /code/media/;
    }
}