# Places API

Used tools

- Node.js
- Typescript
- NestJS
- TypeORM
- Postgres
- Docker
- Docker compose
  
## How to run the application

Use the following steps to run the application

### Running with yarn

```
$ yarn
$ yarn start:dev
```

### Running with docker-compose

```
$ docker-compose up
```

## Endpoints

Add a new place:

`POST: http://localhost:3000/places`

Request body:
```
{
    "country": "Brasil",
    "name": "Fortaleza",
    "targetDate": "2023-02-03",
    "countryFlagUrl": "https://static.mundoeducacao.uol.com.br/mundoeducacao/2022/05/bandeira-estados-unidos.jpg"
}
```

Get the saved places sorted by the target date:

`GET: http://localhost:3000/places`

Get a specific place:

`GET: http://localhost:3000/places/1`

Update a place details (only name and target date can be edited):

`PATCH: http://localhost:3000/places/2`

Request body:
```
{
    "name": "California",
    "targetDate": "2023-02-03",
}
```

Delete a saved place

`DELETE: http://localhost:3000/places/2`