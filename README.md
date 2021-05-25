# Desafio de Backend

<img src="./img/logo-clubpetro.png" style="margin-left: 100px"
     alt="Clubpetro" width="300">

## Índice

- [Descrição](#descrição)
  - [O Desafio](#o-desafio)
  - [Requisitos Obrigatórios](#requisitos-obrigatórios)
  - [Bônus](#bônus)
- [Submissão e Prazo de Entrega](#submissão-e-prazo-de-entrega)
- [Como Rodar](#como-rodar)
- [Tecnologias](#tecnologias)
- [APIs Externas](#apis-externas)
- [Rotas](#rotas)

## Descrição

Este desafio tem como objetivo avaliar as habilidades técnicas do candidato a vaga de desenvolvedor backend no Clubpetro.

#### O Desafio

O desafio consiste em desenvolver uma API rest que permita o CRUD de lugares para se conhecer ao redor do mundo para alimentar o frontend que pode ser visto na imagem a seguir:

<img src="./img/challenge.png" alt="Desafio" >

Os dados a ser considerados são:

- País: O país escolhido;
- Local: O local dentro do país escolhido;
- Meta: O mês e o ano que o usuário pretende visitar o local;
- Url da bandeira do país;
- Data de criação do registro;
- Data de atualização do registro.

#### Requisitos Obrigatórios

> Requisitos que serão avaliados no desafio.

- A API deverá ser desenvolvida com Node.js e Express;
- Apenas o Local e a Meta poderão ser editados;
- O mesmo local em determinado país não poderá ser adicionado de forma duplicada;
- A listagem dos dados deverá ser ordenada de forma crescente pela meta;
- O candidato deverá adicionar ao projeto uma explicação de como executar a aplicação.

#### Bônus

> Requisitos que não são obrigatórios mas podem te deixar em vantagem com relação aos outros candidatos.

- Utilização do framework [NestJS](https://nestjs.com/);
- Typescript;
- Testes automatizados;
- [TypeORM](https://typeorm.io/#/);
- [Docker](https://www.docker.com/);
- Deploy para [Google Cloud Platform](https://cloud.google.com/) (ao criar conta é possível receber um bonus para teste).

### Submissão e Prazo de entrega

- O canditado deverá realizar um fork deste repositório e submeter o código no mesmo;
- Em caso do deploy realizado, a url deverá ser adicionada no README;
- O prazo de entrega para este desafio é de 2 (duas) semanas, contando a partir do dia em que o candidato recebeu o email com o link do repositório;
- Ao finalizar o desafio, o candidato deverá submeter o desafio no questionário disponível na sua área de candidato na plataforma(https://menvievagas.com.br/vagas/fam%C3%8Dliapires/) do Processo Seletivo. É só clicar em RESPONDER no questionário e inserir o link do seu PR.
Em caso de dúvidas, enviar um e-mail para jobs@clubpetro.com.br

## Como Rodar

A aplicação roda em um container com o *Docker*, assim como o banco de dados em *postgres*. É necessário ter instalado também o *docker-compose* para poder rodar o conteúdo dos containers. 

Antes de rodar a aplicação, verifique se as portas 3334 e 5432 no *localhost* estão disponíveis.

O comando abaixo executa a aplicação em modo de desenolvimento e cria uma conexão com o bando de dados.

```bash
$ docker-compose up -d
```

Para verificar se apalicação e o acesso ao banco de dados está funcionando normalmente utilise o camando de logs do docker para verificar.

```bash
$ docker logs places_app
$ docker logs database_clubpetro
```

Com tudo funcionando de acordo com o esperado, em seguida é necessário executar as migrações.

```bash
$ yarn typeorm migrations:run
```

Mais informações sobre as migrações podem ser encontradas dentro da documentação do [TypeORM](https://typeorm.io/#/). Aqui a aplicação realizará somente uma migração, que será responsável pela criação da tabela de lugares.

## Tecnologias
  - [Typescript](https://www.typescriptlang.org/)
  - [Yarn](https://classic.yarnpkg.com/en/)
  - [NPM](https://www.npmjs.com/)
  - [UUID](https://www.npmjs.com/)
  - [TSyringe](https://github.com/Microsoft/tsyringe)
  - [ESLint](https://eslint.org/)
  - [Prettier](https://prettier.io/)
  - [ts-node-dev](https://www.npmjs.com/package/ts-node-dev)
  - [Axios](https://www.axios.com/)
  - [TypeORM](https://typeorm.io/#/)
  - [Docker](https://www.docker.com/)

## APIs Externas

  - [CountryAPI](https://fabian7593.github.io/CountryAPI/): Informações sobre os paises.
  - [Flagpedia](https://flagpedia.net/download/api): Imagens das bandeiras.

## Rotas

### `GET /places`

Retorna todos os lugares armazenados no banco de dados, ordenando por *goal* (Meta) de forma ascendente. O dados retornados possuem o seguinte formato:

```json
[
  {
    "id": "29b949cf-35b2-4735-b6d3-ae6813d11b11",
    "name": "Macaé",
    "country": "Brazil",
    "url_flag": "https://flagcdn.com/h240/br.png",
    "goal": "2020-07-20T00:00:00.000Z",
    "created_at": "2021-05-24T20:10:17.763Z",
    "updated_at": "2021-05-24T20:10:17.763Z"
  },
  {
    "id": "927f8af6-e2e0-4a35-b63b-8818c450136d",
    "name": "Campos",
    "country": "Brazil",
    "url_flag": "https://flagcdn.com/h240/br.png",
    "goal": "2020-07-20T00:00:00.000Z",
    "created_at": "2021-05-24T20:12:29.285Z",
    "updated_at": "2021-05-24T20:12:29.285Z"
  }
]
```
### `GET /countries`

Retorna um lista de objetos contendo o nome e o código dos paises, utilizando a API externa [CountryAPI](https://fabian7593.github.io/CountryAPI/). Os dados retornados possuem o seguinte formato:

```json
[
  {
    "name": "Afghanistan",
    "code": "AF"
  },
  {
    "name": "Åland Islands",
    "code": "AX"
  },
  {
    "name": "Albania",
    "code": "AL"
  },
  ...
]
```

### `POST /places`

Recebe no corpo da requisição os dados com o `name` (nome), `country_data`(dados do pais), quem possuem o `name` (nome) do país e o `code` (código), e o `goal` (Meta) de quando o usuário pretende conhecer o lugar. Uma nova entrada no banco de dados é criada e o objeto recebe um `id` aleatório. Abaixo um exemplo de como utilizar os dados no corpo da requisição.

> Se o `name` deve ser único para cada país.

```json
{
	"name": "Manaus",
	"country_data": {
		"name": "Brazil",
		"code": "BR"
	},
	"goal": "2022-07-20"
}
```

### `PATCH /places/name/:id`

Recebe o `id` de um determinado lugar como parâmetro da requisição e um novo `name` para esse lugar no corpo da requisição. Verifica-se se `id` existe e faz a alteração.

> Se o `name` deve ser único para cada país.

```json
{
  "name": "Fortaleza"
}
```

### `PATCH /places/goal/:id`

Recebe o `id` de um determinado lugar como parâmetro da requisição e um novo `goal` para esse lugar no corpo da requisição. Verifica-se se `id` existe e faz a alteração.

```json
{
  "goal": "2030-05-07"
}
```

### `DELETE /places/:id`

Recebe o `id` de um determinado lugar como parâmetro da requisição e se o `id` existir o lugar é deletado do banco de dados.