# Imagen base Nginx para servir la aplicación web del Ejercicio 4
FROM nginx:alpine

# Copia los archivos estáticos al directorio web de Nginx
COPY . /usr/share/nginx/html

# Puerto HTTP expuesto
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
