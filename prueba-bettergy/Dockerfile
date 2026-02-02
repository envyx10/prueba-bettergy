# Usamos una imagen base oficial de Node.js (versión LTS)
# Usamos alpine para reducir el tamaño de la imagen final
FROM node:20-alpine AS builder

# Establecemos el directorio de trabajo
WORKDIR /app

# Copiamos los archivos de dependencias
COPY package*.json ./
COPY bun.lock* ./

# Instalamos bun globalmente (opcional si usas npm, pero el proyecto usa bun)
RUN npm install -g bun

# Instalamos las dependencias
RUN bun install

# Copiamos el resto del código fuente
COPY . .

# Definimos argumentos de construcción (build args)
ARG PUBLIC_API_URL
ARG PUBLIC_METER_ID

# Los convertimos en variables de entorno para que estén disponibles en el build
ENV PUBLIC_API_URL=$PUBLIC_API_URL
ENV PUBLIC_METER_ID=$PUBLIC_METER_ID

# Construimos la aplicación para producción
RUN bun run build

# --- Etapa de Producción ---
FROM node:20-alpine

WORKDIR /app

# Instalamos bun y dependencias de producción si fuera necesario (aunque copiamos node_modules)
RUN npm install -g bun

# Copiamos los archivos construidos desde la etapa builder
COPY --from=builder /app/build ./build
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

# Exponemos el puerto
EXPOSE 3000

# Iniciamos la aplicación
CMD ["node", "build"]
