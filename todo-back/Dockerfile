# Usa la imagen base de Node
FROM node:18

# Establece el directorio de trabajo
WORKDIR /usr/src/app

# Copia los archivos de configuración
COPY package*.json ./
# Copia el resto de los archivos
COPY . .

# Instala las dependencias
RUN npm install

# Compila el proyecto
RUN npm run build

# Expone el puerto
EXPOSE 4000

# Comando para iniciar la aplicación
CMD ["npm", "run", "start:prod"]
