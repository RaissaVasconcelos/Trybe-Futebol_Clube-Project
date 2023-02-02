# Trybe-Futebol-Clube

O TFC é um site informativo sobre partidas e classificações de futebol! ⚽

## 🗯️ Informações Importantes

É uma aplicação FullStack que gerencia os resultados de partidas de futebol,
minha responsabilidade era desenvolver o back-end para atender as regras do
projeto. 
 
<br />

## ⚙️ Tecnologias

- Node.js
- TypeScript
- Express.js
- Docker Compose
- JWT
- Chai
- Sinon

## Estrutura do Projeto

# Banco de Dados
  
- Será um container docker MySQL já configurado no docker-compose através de um serviço definido como db.
- Tem o papel de fornecer dados para o serviço de backend.
- Durante a execução dos testes sempre vai ser acessado pelo sequelize e via porta 3002 do localhost;
- Você também pode conectar a um Cliente MySQL (Workbench, Beekeeper, DBeaver e etc),
  colocando as credenciais configuradas no docker-compose no serviço db.
  
# Back-End

- Será o ambiente que você realizará a maior parte das implementações exigidas.
- Deve rodar na porta 3001, pois o front-end faz requisições para ele nessa porta por padrão;
- Sua aplicação deve ser inicializada a partir do arquivo app/backend/src/server.ts;
- Garanta que o express é executado e a aplicação ouve a porta que vem das variáveis de ambiente;

# Front-End

- O front já está concluído, não é necessário realizar modificações no mesmo. A única exceção será seu Dockerfile que precisará ser configurado.
- O front se comunica com serviço de back-end pela url http://localhost:3001 através dos endpoints que você deve construir nos requisitos.

# Docker 

- O docker-compose tem a responsabilidade de unir todos os serviços conteinerizados (backend, frontend e db)
  e subir o projeto completo com o comando npm run compose:up ou npm run compose:up:dev;
- Você deve configurar as Dockerfiles corretamente nas raízes do front-end e back-end, para conseguir inicializar a aplicação;


## 🚀 Instalação e execução

### Instalação e execução com Docker

Para rodar está aplicação é necessário ter **Git**, **Node**, **Docker** e o **Docker Compose** instalados no seu computador. O Docker Compose precisa estar na versão **1.29** ou superior e o Node na versão 16.

Para conseguir executar os comandos do abaixo também é necessário que seu sistema operacional tenha um terminal Bash instalado. Caso você esteja utilizando Linux ou macOS, o Bash já vem instalado por padrão. Porém, se o seu sistema for Windows, você pode [aprender como instalar](https://dicasdeprogramacao.com.br/como-instalar-o-git-no-windows/).

### 1 - Na raíz do projeto, suba os containers do backend (`uol_backend`) e do frontend (`uol_frontend`)  e o banco de dados (`mysql`) com o comando:

    docker-compose up -d --build
   
### 2 - Acesse o container do Node com o comando:

    docker exec -it car_shop bash

O container da Api está mapeando a porta:

- car_shop: 3001

Para parar os containers, na pasta raiz do projeto execute o comando:

    docker-compose down
    

