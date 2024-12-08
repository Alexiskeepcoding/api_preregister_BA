# Etapa 1: Construcción
FROM node:18

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar archivos del proyecto
COPY package*.json tsconfig.json ./
COPY src ./src

# Instalar dependencias y construir
RUN npm install && npm run build

# Etapa 2: Producción
FROM node:18

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar dependencias de producción y el código transpilado
COPY package*.json ./
COPY --from=builder /app/dist ./dist
RUN npm install --only=production

# Exponer el puerto (si lo usas)
EXPOSE 3000

# Comando de inicio
CMD ["npm", "start"]
