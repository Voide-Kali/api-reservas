# API de Reserva de Laboratórios e Equipamentos

## 1. Descrição do projeto

A API de Reserva de Laboratórios e Equipamentos foi desenvolvida para gerenciar os recursos de uma instituição de ensino. O sistema permite cadastrar, consultar, atualizar e excluir usuários, laboratórios e equipamentos.

A aplicação utiliza uma API REST para receber requisições HTTP e retornar informações em formato JSON. Os dados são armazenados em um banco de dados SQLite.

## 2. Objetivo

O objetivo do projeto é facilitar a organização dos recursos institucionais, centralizando o gerenciamento de usuários, laboratórios e equipamentos em uma única aplicação.

## 3. Tecnologias utilizadas

- Node.js
- Express
- JavaScript
- SQLite
- better-sqlite3
- API REST
- JSON
- Nodemon

## 4. Funcionalidades implementadas

### Usuários

- Listar todos os usuários.
- Consultar um usuário pelo ID.
- Cadastrar um usuário.
- Atualizar os dados de um usuário.
- Excluir um usuário.

### Laboratórios

- Listar todos os laboratórios.
- Consultar um laboratório pelo ID.
- Cadastrar um laboratório.
- Atualizar os dados de um laboratório.
- Excluir um laboratório.

### Equipamentos

- Listar todos os equipamentos.
- Consultar um equipamento pelo ID.
- Cadastrar um equipamento.
- Atualizar os dados de um equipamento.
- Excluir um equipamento.

**Observação:** embora o projeto tenha como tema a reserva de laboratórios e equipamentos, o arquivo principal `src/app.js` ainda não registra as rotas de reservas. Por isso, os endpoints de reservas não são apresentados como funcionalidades acessíveis nesta versão.

## 5. Requisitos

Para executar o projeto, é necessário ter instalado:

- Node.js
- npm

Para verificar as versões instaladas, execute:

```bash
node --version
npm --version
```

## 6. Instalação

Clone o repositório:

```bash
git clone https://github.com/Voide-Kali/api-reservas.git
```

Entre na pasta do projeto:

```bash
cd api-reservas
```

Instale as dependências:

```bash
npm install
```

## 7. Execução

Para iniciar o servidor em modo de desenvolvimento, utilize:

```bash
npm run dev
```

Para iniciar a aplicação normalmente, utilize:

```bash
npm start
```

O servidor está configurado para utilizar a porta `3000`.

Endereço local:

```text
http://localhost:3000
```

Ao acessar a rota inicial `GET /`, a API retorna uma mensagem indicando que está funcionando.

Exemplo de resposta:

```json
{
  "mensagem": "API de reservas funcionando"
}
```

## 8. Endpoints da API

Os endpoints abaixo correspondem às rotas registradas em `src/app.js`.

| Método HTTP | Endpoint | Descrição |
|---|---|---|
| GET | `/` | Verifica se a API está funcionando |
| GET | `/usuarios` | Lista os usuários |
| GET | `/usuarios/:id` | Busca um usuário pelo ID |
| POST | `/usuarios` | Cadastra um usuário |
| PUT | `/usuarios/:id` | Atualiza um usuário |
| DELETE | `/usuarios/:id` | Exclui um usuário |
| GET | `/laboratorios` | Lista os laboratórios |
| GET | `/laboratorios/:id` | Busca um laboratório pelo ID |
| POST | `/laboratorios` | Cadastra um laboratório |
| PUT | `/laboratorios/:id` | Atualiza um laboratório |
| DELETE | `/laboratorios/:id` | Exclui um laboratório |
| GET | `/equipamentos` | Lista os equipamentos |
| GET | `/equipamentos/:id` | Busca um equipamento pelo ID |
| POST | `/equipamentos` | Cadastra um equipamento |
| PUT | `/equipamentos/:id` | Atualiza um equipamento |
| DELETE | `/equipamentos/:id` | Exclui um equipamento |

O parâmetro `:id` deve ser substituído pelo identificador do recurso desejado. Por exemplo, `/equipamentos/1` consulta o equipamento de ID 1.

## 9. Exemplos de requisições

### 9.1. Usuários

#### Cadastrar usuário

Método: `POST`

Endpoint:

```text
/usuarios
```

Corpo da requisição:

```json
{
  "nome": "Maria Silva",
  "email": "maria@email.com",
  "perfil": "ALUNO"
}
```

Os campos `nome`, `email` e `perfil` são obrigatórios.

#### Listar usuários

Método: `GET`

Endpoint:

```text
/usuarios
```

Retorna uma lista dos usuários cadastrados.

#### Consultar usuário por ID

Método: `GET`

Endpoint de exemplo:

```text
/usuarios/1
```

#### Atualizar usuário

Método: `PUT`

Endpoint de exemplo:

```text
/usuarios/1
```

Corpo da requisição:

```json
{
  "nome": "Maria Silva",
  "email": "maria.novo@email.com",
  "perfil": "ALUNO"
}
```

Os campos obrigatórios devem ser enviados novamente.

#### Excluir usuário

Método: `DELETE`

Endpoint de exemplo:

```text
/usuarios/1
```

Quando a exclusão é realizada com sucesso, a API retorna o status HTTP `204 No Content`.

### 9.2. Laboratórios

#### Cadastrar laboratório

Método: `POST`

Endpoint:

```text
/laboratorios
```

Corpo da requisição:

```json
{
  "nome": "Laboratório de Informática",
  "localizacao": "Bloco A",
  "capacidade": 30
}
```

Os campos `nome`, `localizacao` e `capacidade` são obrigatórios.

#### Listar laboratórios

Método: `GET`

Endpoint:

```text
/laboratorios
```

#### Consultar laboratório por ID

Método: `GET`

Endpoint de exemplo:

```text
/laboratorios/1
```

#### Atualizar laboratório

Método: `PUT`

Endpoint de exemplo:

```text
/laboratorios/1
```

Corpo da requisição:

```json
{
  "nome": "Laboratório de Informática",
  "localizacao": "Bloco B",
  "capacidade": 35
}
```

#### Excluir laboratório

Método: `DELETE`

Endpoint de exemplo:

```text
/laboratorios/1
```

Quando a exclusão é realizada com sucesso, a API retorna `204 No Content`.

### 9.3. Equipamentos

#### Cadastrar equipamento

Método: `POST`

Endpoint:

```text
/equipamentos
```

Corpo da requisição:

```json
{
  "nome": "Projetor",
  "descricao": "Projetor multimídia",
  "quantidade": 5
}
```

Os campos `nome` e `quantidade` são obrigatórios. O campo `descricao` pode ser informado para detalhar o equipamento.

#### Listar equipamentos

Método: `GET`

Endpoint:

```text
/equipamentos
```

Retorna a lista dos equipamentos cadastrados.

#### Consultar equipamento por ID

Método: `GET`

Endpoint de exemplo:

```text
/equipamentos/1
```

#### Atualizar equipamento

Método: `PUT`

Endpoint de exemplo:

```text
/equipamentos/1
```

Corpo da requisição:

```json
{
  "nome": "Projetor multimídia",
  "descricao": "Projetor para apresentações",
  "quantidade": 8
}
```

Os campos `nome` e `quantidade` são obrigatórios.

#### Excluir equipamento

Método: `DELETE`

Endpoint de exemplo:

```text
/equipamentos/1
```

Quando a exclusão é realizada com sucesso, a API retorna `204 No Content`.

## 10. Códigos de resposta HTTP

| Código | Significado |
|---|---|
| `200 OK` | Requisição realizada com sucesso |
| `201 Created` | Recurso criado com sucesso |
| `204 No Content` | Operação realizada sem conteúdo de resposta |
| `400 Bad Request` | Dados inválidos ou obrigatórios ausentes |
| `404 Not Found` | Recurso não encontrado |

As respostas de erro são retornadas em JSON, com uma mensagem no campo `erro`.

Exemplo:

```json
{
  "erro": "Equipamento não encontrado"
}
```

## 11. Organização do projeto

A estrutura principal da aplicação está organizada da seguinte maneira:

```text
api-reservas/
├── src/
│   ├── app.js
│   ├── controllers/
│   │   ├── usuarios.controller.js
│   │   ├── laboratorios.controller.js
│   │   └── equipamentos.controller.js
│   ├── routes/
│   │   ├── usuarios.routes.js
│   │   ├── laboratorios.routes.js
│   │   └── equipamentos.routes.js
│   └── database/
│       └── database.js
├── package.json
├── package-lock.json
└── README.md
```

### Responsabilidade dos arquivos

- `app.js`: configura o Express, registra as rotas e inicia o servidor.
- `controllers/`: contém as funções responsáveis pelas operações de cada recurso.
- `routes/`: define os métodos HTTP e associa cada endpoint à função correspondente do controller.
- `database/`: contém a configuração de acesso ao banco de dados.
- `package.json`: define as dependências e os comandos de execução.
- `README.md`: documenta o funcionamento e a utilização da API.

## 12. Banco de dados

A aplicação utiliza SQLite por meio da biblioteca `better-sqlite3`. Os controllers consultam e modificam os registros utilizando comandos SQL.

As entidades principais relacionadas ao objetivo do projeto são usuários, laboratórios, equipamentos e reservas. Entretanto, os endpoints de reservas ainda não estão registrados na configuração atual do servidor.

## 13. Estado atual do projeto

O projeto possui operações de cadastro, consulta, atualização e exclusão para usuários, laboratórios e equipamentos.

A implementação das rotas de reservas ainda precisa ser integrada ao arquivo principal da aplicação para que essas operações possam ser acessadas por requisições HTTP.

## 14. Considerações finais

A API organiza o gerenciamento de recursos institucionais por meio de endpoints REST e utiliza SQLite para persistir os dados. Sua estrutura separa as rotas, os controllers e o acesso ao banco de dados, facilitando a manutenção e a ampliação das funcionalidades.

A documentação descreve as rotas atualmente registradas na aplicação, sem apresentar endpoints de reservas que ainda não estão disponíveis.
