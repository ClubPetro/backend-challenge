# Backend-challenge

## Descrição

O objetivo deste projeto é criar uma API para gerenciar lugares e suas metas, onde é possível criar, listar, atualizar e excluir lugares, bem como atualizar suas metas.

## Tecnologias Utilizadas

- Node.js
- Express.js
- TypeScript
- TypeORM
- Jest
- Docker Compose

## Como Rodar o Projeto

### Pré-requisitos

- Node.js (versão 14 ou superior)
- Docker (versão 20 ou superior)
- Docker Compose (versão 1.28 ou superior)

### Passo a Passo

1. Clone o repositório em sua máquina
2. Instale as dependências do projeto com o comando `yar install`
3. Inicie o banco de dados e o servidor com o Docker Compose, executando o comando `docker-compose up -d`
4. Execute o projeto com o comando `yarn dev`

Após seguir esses passos, o seu projeto deverá estar rodando em `http://localhost:3333`.

## Rotas

Abaixo estão as rotas disponíveis na API:

- `POST /country` - Cria um país
- `POST /place` - Cria um lugar
- `GET /` - Lista todos os lugares
- `PATCH /place/update/:id` - Atualiza um lugar ou sua meta
- `DELETE /place/delete/:id` - Exclui um lugar

## Como Rodar os Testes

Para executar os testes, execute o comando `yarn test`. Os testes serão executados utilizando o Jest e serão exibidos no console.
