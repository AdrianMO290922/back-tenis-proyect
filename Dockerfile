FROM node:20-alpine AS builder

# 1. Directorio en el cual va a trabajar
WORKDIR /app

# Dependencias
COPY package*.json ./
COPY prisma ./prisma
RUN npm install

# 3. Generar el  Prisma client
RUN npx prisma generate

# 4. Copiar el proyecto completo
COPY . .

# 5. Construir NestJS (genera /dist)
RUN npm run build



# ─────────────────────────────────────────────
#              (PRODUCCIÓN)
# ─────────────────────────────────────────────
FROM node:20-alpine AS production

WORKDIR /app

# Solo instalamos dependencias necesarias para producción
COPY package*.json ./
RUN npm install --only=production

# Copiamos el cliente de Prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

# Copiamos el código construido
COPY --from=builder /app/dist ./dist

# Copiamos carpeta prisma (a veces se necesita)
COPY --from=builder /app/prisma ./prisma

EXPOSE 4321

CMD ["npm", "run", "start:prod"]
