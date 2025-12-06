FROM node:18-alpine

# Justificación técnica: node:18-alpine es una imagen oficial optimizada
# que proporciona Node.js 18 en un entorno Alpine Linux minimalista,
# reduciendo el tamaño de la imagen y mejorando los tiempos de construcción.

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install --production

# Copiar el resto de la aplicación
COPY . .

# Exponer el puerto
EXPOSE 5000

# Comando para iniciar la aplicación
CMD ["npm", "start"]

