# API de Reserva de Laboratórios e Equipamentos

## Descrição

A API foi desenvolvida para organizar e gerenciar reservas de laboratórios e equipamentos de uma instituição.

O sistema permite o cadastro e gerenciamento de usuários e laboratórios, além da criação e consulta de reservas. As reservas possuem regras para evitar conflitos de horários entre recursos e usuários.

A API foi desenvolvida utilizando Node.js, Express e um banco de dados para armazenamento das informações.

## Objetivo

O objetivo do projeto é facilitar o controle dos recursos da instituição, permitindo que usuários realizem solicitações de reserva de laboratórios ou equipamentos e evitando conflitos de horários.

## Entidades

O sistema possui as seguintes entidades principais:

* Usuários
* Laboratórios
* Equipamentos
* Reservas

## Funcionalidades

Atualmente, a API possui as seguintes funcionalidades:

* Listar usuários;
* Buscar usuário por ID;
* Cadastrar usuários;
* Atualizar usuários;
* Deletar usuários;
* Listar laboratórios;
* Buscar laboratório por ID;
* Cadastrar laboratórios;
* Atualizar laboratórios;
* Deletar laboratórios;
* Listar reservas;
* Buscar reserva por ID;
* Criar reservas.

O controller de reservas também possui funções para aprovação, recusa e cancelamento de reservas, porém essas funções ainda não estão registradas no arquivo de rotas atual.

## Tecnologias utilizadas

* Node.js
* Express
* JavaScript
* SQLite
* REST API
* JSON

## Instalação

### Pré-requisitos

É necessário possuir o Node.js e o npm instalados.

Para verificar se estão instalados:

```bash
node --version
npm --version
```

### Clonar o projeto

```bash
git clone https://github.com/lorenaamaral123/PTAC-trabalho.git
```

Entrar na pasta do projeto:

```bash
cd PTAC-trabalho
```

### Instalar as dependências

```bash
npm install
```

## Execução

Para iniciar a aplicação, utilize o comando definido no `package.json`.

Caso o projeto utilize o script `start`:

```bash
npm start
```

Caso o servidor seja iniciado diretamente pelo arquivo principal:

```bash
node server.js
```

A porta e o endereço utilizados pela aplicação dependem da configuração do servidor.

## Rotas

As rotas são organizadas em três grupos:

* Usuários
* Laboratórios
* Reservas

O prefixo utilizado por cada grupo depende da configuração do arquivo principal da aplicação.

### Usuários

As rotas de usuários estão definidas no arquivo `usuarios.routes.js`.

#### Listar usuários

```http
GET /usuarios
```

Retorna todos os usuários cadastrados.

#### Buscar usuário

```http
GET /usuarios/:id
```

Exemplo:

```http
GET /usuarios/1
```

Retorna o usuário correspondente ao ID informado.

Caso o usuário não seja encontrado, a API retorna:

```json
{
  "erro": "Usuário não encontrado"
}
```

#### Cadastrar usuário

```http
POST /usuarios
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

Caso algum campo não seja informado:

```json
{
  "erro": "Nome, email e perfil são obrigatórios"
}
```

#### Atualizar usuário

```http
PUT /usuarios/:id
```

Exemplo:

```http
PUT /usuarios/1
```

Corpo da requisição:

```json
{
  "nome": "Maria Silva",
  "email": "maria.novo@email.com",
  "perfil": "ALUNO"
}
```

Os campos `nome`, `email` e `perfil` são obrigatórios.

#### Deletar usuário

```http
DELETE /usuarios/:id
```

Exemplo:

```http
DELETE /usuarios/1
```

Quando a exclusão é realizada com sucesso, a API retorna o status `204 No Content`.

---

## Laboratórios

As rotas de laboratórios estão definidas no arquivo `laboratorios.route.js`.

### Listar laboratórios

```http
GET /laboratorios
```

Retorna todos os laboratórios cadastrados.

### Buscar laboratório

```http
GET /laboratorios/:id
```

Exemplo:

```http
GET /laboratorios/1
```

Caso o laboratório não seja encontrado:

```json
{
  "erro": "Laboratório não encontrado"
}
```

### Cadastrar laboratório

```http
POST /laboratorios
```

Corpo da requisição:

```json
{
  "nome": "Laboratório 01",
  "localizacao": "Bloco A",
  "capacidade": 30
}
```

Os campos `nome`, `localizacao` e `capacidade` são obrigatórios.

### Atualizar laboratório

```http
PUT /laboratorios/:id
```

Exemplo:

```http
PUT /laboratorios/1
```

Corpo da requisição:

```json
{
  "nome": "Laboratório 01",
  "localizacao": "Bloco B",
  "capacidade": 35
}
```

### Deletar laboratório

```http
DELETE /laboratorios/:id
```

Exemplo:

```http
DELETE /laboratorios/1
```

Quando a exclusão é realizada com sucesso, a API retorna o status `204 No Content`.

---

## Reservas

As rotas de reservas estão definidas no arquivo `reservas.routes.js`.

Atualmente, o arquivo de rotas registra três endpoints:

* Listar reservas;
* Buscar reserva;
* Criar reserva.

### Listar reservas

```http
GET /reservas
```

Retorna todas as reservas cadastradas.

### Buscar reserva

```http
GET /reservas/:id
```

Exemplo:

```http
GET /reservas/1
```

Caso a reserva não seja encontrada:

```json
{
  "erro": "Reserva não encontrada"
}
```

### Criar reserva

```http
POST /reservas
```

Corpo da requisição:

```json
{
  "usuario_id": 1,
  "laboratorio_id": 1,
  "inicio": "2026-10-05 14:00",
  "fim": "2026-10-05 16:00",
  "motivo": "Aula prática"
}
```

Também é possível realizar uma reserva utilizando um equipamento:

```json
{
  "usuario_id": 1,
  "equipamento_id": 1,
  "inicio": "2026-10-05 14:00",
  "fim": "2026-10-05 16:00",
  "motivo": "Apresentação"
}
```

É necessário informar:

* `usuario_id`;
* `inicio`;
* `fim`;
* pelo menos um recurso: `laboratorio_id` ou `equipamento_id`.

### Validações da reserva

A API verifica se:

* O usuário informado existe;
* O laboratório informado existe;
* O equipamento informado existe;
* O horário inicial é anterior ao horário final;
* O laboratório ou equipamento não possui outra reserva no mesmo período;
* O usuário não possui outra reserva no mesmo período.

Caso não seja informado um laboratório ou equipamento:

```json
{
  "erro": "Informe um laboratório ou um equipamento"
}
```

Caso o horário seja inválido:

```json
{
  "erro": "O início deve ser anterior ao fim"
}
```

Caso o usuário não exista:

```json
{
  "erro": "Usuário não encontrado"
}
```

Caso o laboratório não exista:

```json
{
  "erro": "Laboratório não encontrado"
}
```

Caso o equipamento não exista:

```json
{
  "erro": "Equipamento não encontrado"
}
```

Caso o recurso já esteja reservado:

```json
{
  "erro": "O laboratório ou equipamento já está reservado nesse período"
}
```

Caso o usuário já possua uma reserva no mesmo período:

```json
{
  "erro": "O usuário já possui uma reserva nesse período"
}
```

---

## Regras de negócio

### Regra 1 — Conflito de recurso

Não pode existir outra reserva para o mesmo laboratório ou equipamento em um horário sobreposto.

As reservas com status `PENDENTE` ou `APROVADA` são consideradas na verificação de conflito.

Por exemplo, se um laboratório estiver reservado das 14:00 às 16:00, não será possível criar outra reserva para esse mesmo laboratório durante um período que se sobreponha a esse horário.

### Regra 2 — Conflito de horário do usuário

Um mesmo usuário não pode possuir duas reservas em horários sobrepostos.

As reservas com status `PENDENTE` ou `APROVADA` são consideradas nessa verificação.

### Regra 3 — Aprovação

O controller de reservas possui uma função para aprovação de reservas.

Somente usuários com perfil `PROFESSOR` ou `TECNICO` podem aprovar uma reserva.

No entanto, a rota de aprovação ainda não está registrada no arquivo `reservas.routes.js`.

O mesmo ocorre com as funções de recusar e cancelar reservas.

---

## Funções de reservas ainda não expostas por rotas

O arquivo `reservas.controller.js` possui as seguintes funções:

```text
aprovarReserva
recusarReserva
cancelarReserva
```

Porém, atualmente o arquivo `reservas.routes.js` registra somente:

```text
GET /
GET /:id
POST /
```

Portanto, as funções de aprovação, recusa e cancelamento existem no controller, mas ainda não podem ser acessadas por endpoints da API enquanto não forem adicionadas às rotas.

---

## Métodos HTTP utilizados

| Método | Função                |
| ------ | --------------------- |
| GET    | Consultar informações |
| POST   | Criar informações     |
| PUT    | Atualizar informações |
| DELETE | Deletar informações   |

## Resumo dos endpoints

| Método | Endpoint            | Descrição                    |
| ------ | ------------------- | ---------------------------- |
| GET    | `/usuarios`         | Lista todos os usuários      |
| GET    | `/usuarios/:id`     | Busca um usuário pelo ID     |
| POST   | `/usuarios`         | Cadastra um usuário          |
| PUT    | `/usuarios/:id`     | Atualiza um usuário          |
| DELETE | `/usuarios/:id`     | Deleta um usuário            |
| GET    | `/laboratorios`     | Lista todos os laboratórios  |
| GET    | `/laboratorios/:id` | Busca um laboratório pelo ID |
| POST   | `/laboratorios`     | Cadastra um laboratório      |
| PUT    | `/laboratorios/:id` | Atualiza um laboratório      |
| DELETE | `/laboratorios/:id` | Deleta um laboratório        |
| GET    | `/reservas`         | Lista todas as reservas      |
| GET    | `/reservas/:id`     | Busca uma reserva pelo ID    |
| POST   | `/reservas`         | Cria uma reserva             |

## Status HTTP utilizados

A API utiliza diferentes códigos de status para indicar o resultado das operações.

| Código | Significado                                        |
| ------ | -------------------------------------------------- |
| `201`  | Recurso criado com sucesso                         |
| `204`  | Operação realizada sem conteúdo de resposta        |
| `400`  | Requisição inválida ou dados obrigatórios ausentes |
| `403`  | Usuário sem permissão para realizar a operação     |
| `404`  | Recurso não encontrado                             |
| `409`  | Conflito com uma reserva existente                 |

## Testes automatizados

Como recurso opcional, poderão ser desenvolvidos testes automatizados para verificar as principais funcionalidades da API.

Entre os testes que podem ser realizados estão:

* Cadastro de usuários;
* Consulta de usuários;
* Atualização de usuários;
* Exclusão de usuários;
* Cadastro de laboratórios;
* Consulta de laboratórios;
* Atualização de laboratórios;
* Exclusão de laboratórios;
* Criação de reservas;
* Consulta de reservas;
* Validação de horários;
* Verificação de conflitos de reservas;
* Verificação de conflitos de horário do usuário.

## Status do projeto

Projeto em desenvolvimento.