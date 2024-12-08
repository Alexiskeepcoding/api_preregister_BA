# Usa una imagen base de Node.js
FROM node:20.17.0

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia el package.json y el package-lock.json
COPY package*.json ./

# Copia el archivo schema.prisma
COPY prisma/schema.prisma ./prisma/

# Instala las dependencias y ejecuta prisma generate en una sola instrucción RUN
RUN npm install && npx prisma generate

# Copia el resto de la aplicación
COPY . .

# Expone el puerto en el que la aplicación se ejecutará
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "start"]