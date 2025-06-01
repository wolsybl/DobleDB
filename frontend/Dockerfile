# Usa una imagen oficial de Node.js
FROM node:18

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos
COPY . .

# Expone el puerto 3000
EXPOSE 3000

# Inicia la app
CMD ["npm", "start"]
