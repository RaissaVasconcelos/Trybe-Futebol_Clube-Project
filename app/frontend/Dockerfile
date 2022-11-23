FROM node:16.14-alpine

WORKDIR /app-frontend

# trazer o package.json para instalação do app na nova imagem
COPY package* ./

# instalar as dependencias
RUN npm install

# # copiar todas as novas dependencias neste app
COPY . .

CMD ["npm", "start"]
