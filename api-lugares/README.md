# API Backend-Challenge Lugares
<p align="center">
  API CRUD simples para o <a href= "https://github.com/ClubPetro/backend-challenge">backend-challenge</a> da Club Petro
</p>

Tabela de conteúdos
=================
- [API Backend-Challenge Lugares](#api-backend-challenge-lugares)
- [Tabela de conteúdos](#tabela-de-conteúdos)
  - [⚙️ Funcionalidades](#️-funcionalidades)
  - [🚀 Como Executar o projeto](#-como-executar-o-projeto)
    - [Pré-requisitos](#pré-requisitos)
    - [🎲 Rodando a API](#-rodando-a-api)
  - [🛠 Tecnologias](#-tecnologias)
  - [👦 Autor](#-autor)
  - [📝 Licença](#-licença)

<h4 align="center"> 
  🚧 Concluído 🚀🚧
</h4>

---

## ⚙️ Funcionalidades

- [x] Cadastro de Lugar
- [x] Listagem de todos os Lugares cadastrados
- [x] Consulta de Lugar por ID
- [x] Atualiza um Lugar pelo seu ID
- [x] Deleta um Lugar pelo seu ID

---

## 🚀 Como Executar o projeto

### Pré-requisitos

É preciso ter instalado o [Node.js](https://nodejs.org/en/), [Nest.js](https://nestjs.com/) e o [PostgreSQL](https://www.postgresql.org/) na sua máquina local. No caso do PostgreSQL poderá ser usado uma instância de graça no [ElephantSQL](https://www.elephantsql.com/), é recomendado nesse caso usar um Data Center o mais perto possível da sua localização. Caso seja escolhido um Banco de Dados local, crie o mesmo e guarde as informações essenciais desse, como: nome de usuário, senha do banco, hostname, porta e nome do banco de dados criado.

### 🎲 Rodando a API

Abra seu terminal/cmd e digite o comando abaixo:
```bash
# Clone este repositório
$ git clone https://github.com/gabbrieu/backend-challenge.git
```

Após, crie um arquivo chamado .env na raiz da pasta "api-lugares" pelo terminal/cmd ou manualmente. Com isso, preencha-o seguindo como modelo o arquivo .env.example. Se estiver usando uma instância do ElephantSQL é só copiar a URL fornecida pelo mesmo e colar no .env. Após, volte para o terminal/cmd e digite os comandos nessa ordem (levando em consideração que voçê esteja já na raiz da pasta api-lugares, se não estiver a acesse pelo terminal/cmd):

```bash
# Instale as dependências
$ npm install

# Execute a aplicação
$ npm run start

# O servidor inciará na porta:3000 - acesse <http://localhost:3000> lá terá a API toda documentada e pronta pra uso com o próprio Swagger (recomendado).
# Mas você ainda pode utilizar o Postman e o Insomnia
```
---

## 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

- [Node.js](https://nodejs.org/en/)
- [Nest.js](https://nestjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Swagger](https://swagger.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [TypeORM](https://typeorm.io/)
- [class-validator](https://github.com/typestack/class-validator)
- [dotENV](https://github.com/motdotla/dotenv)

---

## 👦 Autor

<img style="border-radius: 50%;" src="https://avatars3.githubusercontent.com/u/73564749?s=460&u=dca37f3c329fbfd9342f541e37629f9c2747afd6&v=4" width="100px;" alt="foto perfil"/>

<sub><b>Gabriel Mendes</b></sub>

[![Linkedin Badge](https://img.shields.io/badge/-Gabriel-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/gabbrieu/)](https://www.linkedin.com/in/gabbrieu/) [![Gmail Badge](https://img.shields.io/badge/-gabrielhmendes@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:gabrielhmendes@gmail.com)](mailto:gabrielhmendes@gmail.com)

---

## 📝 Licença

Este projeto está sobe a licença [MIT](../LICENSE).

Feito com ❤️ por Gabriel Mendes 👋🏽 [Entre em contato!](https://www.linkedin.com/in/gabbrieu/)

---
