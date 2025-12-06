FROM node:18-alpine

# Justificación técnica: node:18-alpine es necesaria para construir la aplicación React
# ya que react-scripts requiere Node.js para compilar y servir la aplicación.
# Alpine reduce significativamente el tamaño de la imagen final.

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto de la aplicación
COPY . .

# Exponer el puerto de React
EXPOSE 3000

# Iniciar la aplicación en modo desarrollo
# En producción se debería usar: npm run build && npx serve -s build
CMD ["npm", "start"]

