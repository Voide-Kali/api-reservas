# API de Reservas de Laboratórios e Equipamentos

API REST desenvolvida com Node.js, Express e MongoDB.

## Tecnologias

- Node.js
- Express
- MongoDB
- JavaScript
- Docker
- dotenv

## Arquitetura

O projeto utiliza uma arquitetura MVC organizada em camadas:

- Routes: define os endpoints HTTP.
- Controllers: recebe requisições e envia respostas.
- Services: contém regras de negócio e validações.
- Models: realiza operações no MongoDB.
- Database: gerencia a conexão com o banco.
- App: configura o Express e registra as rotas.
- Server: inicia a aplicação.

## Estrutura

\`\`\`
src/
├── server.js
├── app.js
├── routes/
├── controllers/
├── services/
├── models/
├── database/
└── utils/
\`\`\`

## Instalação

\`\`\`bash
npm install
docker compose up -d
npm run dev
\`\`\`

## Execução

Servidor:

http://localhost:3000

## Entidades

- Usuários
- Laboratórios
- Equipamentos
- Reservas
