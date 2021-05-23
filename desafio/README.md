<h1 align="center">
    <a href="https://github.com/BrDSF/backend-challenge">✈️ Back-End Challenge</a>
</h1>
<p align="center">📆 API CRUD para marcar datas para lugares a se conhecer no mundo </p>

# Tabela de conteúdos

- [📜 Descrição](#-descrição)
- [Tabela de conteúdos](#tabela-de-conteúdos)
- [🏃 Como Rodar a API](#-como-rodar-a-api)
  - [✅ Pré Requisitos](#-pré-requisitos)
  - [✅ Usando a API](#-usando-a-api)
    - [✅ Clonando repositório](#-clonando-repositório)
    - [✅ Instalando depêndencias e iniciando a API](#-instalando-depêndencias-e-iniciando-a-api)
- [⚙️ Testes Unitários](#testes-unitários)
- [🛠 Tecnologias](#-tecnologias)
- [🧑🏽 Autor](#-autor)

<h4 align="center"> 
	🏁 Em andamento  🏁
</h4>

---

## 📜 Descrição

Repositório da [API](https://github.com/BrDSF/backend-challenge) do back-end challenge.

---

## 🔁 Como Rodar a API

### ✅ Pré Requisitos

Para iniciar a API é necessário ter algumas ferramentas instaladas em sua máquina, o [Node.js](https://nodejs.org/en/), [Nest.js](https://nestjs.com) e o [PostgreSQL](https://www.postgresql.org), para o banco de dados ele pode ser local ou não, mas para os dois casos basta ter acesso ao hostname, usuário, senha e nome do banco de dados e também a porta, caso esta não tenha sido deixada como padão do [PostgreSQL](https://www.postgresql.org).

### ✅ Usando a API

Há duas formas de acessar a API, de forma local ou pelo pelo link do deploy, caso a opção seja essa útilma, clique no seginte link, <a href="http://134.122.18.236:3000/api/"> Link para a API</a>, ele irá te redirecionar para a API documentada no Swagger.

### ✅ Clonando repositório

Para usar a api local, abra seu terminal/cmd clone este repositório usando o comando abaixo:

```bash
# clonar repositório
$ https://github.com/BrDSF/backend-challenge.git
```

Entre na pasta raiz do projeto, "desafio", e crie um arquivo com a seguinte nomeclatura, ".env", sem as aspas. Este arquivo terá as variáveis do banco de dados, um modelo dele pode ser encontrado no arquivo da pasta raiz .env.examples, copie este modelo para dentro do seu .env e preencha com os dados requisitados.

### ✅ Instalando depêndencias e iniciando a API

Ainda dentro da pasta raiz, "desafio", instale as dependências no node, e inicie a API em seu terminal, usando os comandos abaixo:

```bash

#Acesse a pasta do projeto no terminal/cmd
$ cd desafio

# instalando dependecias
$ npm install

# rodando a api
$ npm run start:dev

# O servidor inciará na porta:3000 - acesse <http://localhost:3000/api>, este caminho irá te redirecionar para o Swagger.
```

Dentro da api existem rotas que podem ser testadas e utilizadas, você pode usar o Swagger, como comentado acima, que já vem com toda a api documentada e prota para uso, ou usar o Postman ou Insomnia.

---

## ⚙️ Testes Unitários

Para rodar alguns teste unitários dentro da api, é necessário estar dentro da pasta raiz do projeto, "desafio", e rodar em seu terminal:

```bash
#Comando para rodas os testes
$ npm run test
```

## 🛠 Tecnologias

---

As seguintes ferramentas foram usadas na construção do projeto:

- [Node.js](https://nodejs.org)
- [Nest.js](https://nodejs.org)
- [PostresSQL](https://www.postgresql.or)
- [TypeScript](https://www.typescriptlang.org/)
- [Swagger](https://swagger.io)
- [TypeORM](https://typeorm.io/)

### 🧑🏽 Autor

---

<a href="https://github.com/BrDSF">
 <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/56849210?s=400&u=570b60dff5f67fed7fd5daef77b2e2f8e8c729c2&v=4" width="100px;" alt=""/>
 <br/>
 <b>Brayan Freitas</b></a>

Feito com ❤️ por Brayan Freitas 👋🏽 Entre em contato!

[![Linkedin Badge](https://img.shields.io/badge/-Brayan-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in//brayan-freitas-86a6721a7/)](https://www.linkedin.com/in/brayan-freitas-86a6721a7/)
[![Gmail Badge](https://img.shields.io/badge/-brayandeyvid17@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:brayandeyvid17@gmail.com)](mailto:brayandeyvid17@gmail.com)
