# Nginx web server base image
FROM nginx:alpine

# Static files ko Nginx ke public folder me copy karein
COPY . /usr/share/nginx/html

# Default HTTP port 80 expose karein
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]