# Iniciando o projeto
FROM node:16.14-alpine

WORKDIR /app-backend

# trazer o package.json para instalação do app na nova imagem
COPY package* ./

EXPOSE 3001

# instalar as dependencias
RUN npm install

# copiar todas as novas dependencias neste app
COPY . .

ENTRYPOINT ["npm", "run"]

CMD [ "dev" ]
