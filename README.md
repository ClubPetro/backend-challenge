# Desafio de Backend

<img src="./img/logo-clubpetro.png" style="margin-left: 100px"
     alt="Clubpetro" width="300">

- [Descrição](#descrição)
  - [O Desafio](#o-desafio)
  - [Requisitos Obrigatórios](#requisitos-obrigatórios)
  - [Bônus](#bônus)
- [Submissão e Prazo de Entrega](#submissão-e-prazo-de-entrega)

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

---

## Descrição do desenvolvimento

### Informações

- [x] node
- [x] nestjs
- [x] docker
- [x] docker-compose
- [x] CI/CD com github actions
  - [x] novo PR na master -> testes automatizados
  - [x] push na master -> deploy GCP
- [x] [URL da aplicação]() // TODO adicionar a URL

### Rodando a aplicação

Build

```bash
docker-compose build
```

Run

```bash
docker-compose up
```

Rebuild and run

```bash
docker-compose up --build
```

# Rotas

## GET /docs

Documentação da api com Swagger.

## GET /places

Lista todos os lugares ordernado pela data da meta.

### **Parametros**

|          Nome | Requerido |  Tipo   | Descrição                                                                                                                                                           |
| -------------:|:---------:|:-------:| ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     `order`   | opcional  | string  | order por outra propriedade, exemplo `createdAt:DESC`. |
|

## GET /places/:id

Buscar um lugar por id.

## POST /places

Criar novo lugar.

### Exemplo para criar

```json
{
  "country": "Brasil",
  "location": "Rio de Janeiro",
  "goal": "2022-12-01T16:52:07.055Z",
  "imageUrl": "https://static.todamateria.com.br/upload/ba/nd/bandeiradobrasil-2-cke.jpg"
}
```

## PATCH /places/:id

atualizar um lugar.

### Exemplo para atualizar

```json
{
  "location": "Ibiporã",
  "goal": "2022-10-01T16:52:07.055Z"
}
```

## DELETE /places/:id

deletar um lugar.