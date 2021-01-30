# Desafio de Backend

<img src="./img/logo-clubpetro.png" style="margin-left: 100px"
     alt="Clubpetro" width="300">

##Instruções de Execução
###Instalação
Clonar esse projeto:
`$ git clone https://github.com/inovaprog/backend-challenge.git`

Instalar as Dependências:
`$ npm install`

###Endpoints:
###Countrys:
####1. Adicionar novo País:  **POST** `/api/v1/countrys` 
Corpo da requisição:
```json
{
"nome" : "Uruguai",
"url_bandeira" : "https://restcountries.eu/data/ury.svg"
}
```

Cadastro com sucesso: **STATUS: 200 OK**
```json
[
  {
    "nome": "Uruguai",
    "url_bandeira": "https://restcountries.eu/data/ury.svg",
    "_id": "6015bc27885d7a59783b5e30"
  }
]
```
Cadastro com erro: **STATUS: 400 Bad Request**
- País já cadastrado

####2. Ver Todos os países:  **GET** `/api/v1/countrys` 


Consulta realizada com sucesso: **STATUS: 200 OK**
```json
[
  {
    "_id": "601594203e4a3f31ecd2af99",
    "nome": "Brasil",
    "url_bandeira": "url-da-bandeira-do-pais"
  },
  {
    "_id": "601594163e4a3f31ecd2af98",
    "nome": "China",
    "url_bandeira": "url-da-bandeira-do-pais"
  },
  {
    "_id": "6015943c3e4a3f31ecd2af9c",
    "nome": "Japao",
    "url_bandeira": "url-da-bandeira-do-pais"
  },
  {
    "_id": "601594263e4a3f31ecd2af9a",
    "nome": "Paraguai",
    "url_bandeira": "url-da-bandeira-do-pais"
  }
]
```
####3. Buscar um país pelo ID:  **GET** `/api/v1/countrys/:id` 


Consulta realizada com sucesso: **STATUS: 200 OK**
```javascript

//api/v1/countrys/601594203e4a3f31ecd2af99

[
  {
    "_id": "601594203e4a3f31ecd2af99",
    "nome": "Brasil",
    "url_bandeira": "url-da-bandeira-do-pais"
  },
 ]
 ```
####4. Excluir um país:  **DELETE** `/api/v1/countrys/:id` 


Exclusão realizada com sucesso: **STATUS: 200 OK**
```javascript
{
  "result": {
    "n": 1,
    "opTime": {
      "ts": "6923646843482013697",
      "t": 4
    },
    "electionId": "7fffffff0000000000000004",
    "ok": 1,
    "$clusterTime": {
      "clusterTime": "6923646843482013697",
      "signature": {
        "hash": "loPoma41DgQZyvBjuAw9VKDgRBg=",
        "keyId": "6918846762262200323"
      }
    },
    "operationTime": "6923646843482013697"
  },
  "connection": {
    "_events": {},
    "_eventsCount": 4,
    "id": 1,
    "address": "35.247.244.88:27017",
    "bson": {},
    "socketTimeout": 0,
    "host": "cluster0-shard-00-02.d4gur.mongodb.net",
    "port": 27017,
    "monitorCommands": false,
    "closed": false,
    "destroyed": false,
    "lastIsMasterMS": 28
  },
  "deletedCount": 1,
  "n": 1,
  "opTime": {
    "ts": "6923646843482013697",
    "t": 4
  },
  "electionId": "7fffffff0000000000000004",
  "ok": 1,
  "$clusterTime": {
    "clusterTime": "6923646843482013697",
    "signature": {
      "hash": "loPoma41DgQZyvBjuAw9VKDgRBg=",
      "keyId": "6918846762262200323"
    }
  },
  "operationTime": "6923646843482013697"
}
```


------------




###Places:
####1. Adicionar novo Local:  **POST** `/api/v1/places` 
Corpo da requisição:
```json
{
"country_id" : "601594203e4a3f31ecd2af99",
"place" : "Praia de Guarapari",
"meta" : "01/2022"
}
```

Cadastro com sucesso: **STATUS: 200 OK**
```json
[
  {
    "country_id": "601594203e4a3f31ecd2af99",
    "pais": "Brasil",
    "url_bandeira": "url-da-bandeira-do-pais",
    "place": "Praia de Guarapari",
    "meta": "2022-01-01T00:00:00.000Z",
    "data_criacao": "2021-01-30T20:13:35.515Z",
    "data_edicao": "2021-01-30T20:13:35.515Z",
    "_id": "6015bdef136d165b7eb0a1c6"
  }
]
```
Cadastro com erro: **STATUS: 400 Bad Request**

- Local já cadastrado

####2. Ver Todos os Locais:  **GET** `/api/v1/places` 


Consulta realizada com sucesso: **STATUS: 200 OK**
```json
[
  {
    "_id": "6015bdef136d165b7eb0a1c6",
    "country_id": "601594203e4a3f31ecd2af99",
    "pais": "Brasil",
    "url_bandeira": "urldabandeira",
    "place": "Praia de Guarapari",
    "meta": "2022-01-01T00:00:00.000Z",
    "data_criacao": "2021-01-30T20:13:35.515Z",
    "data_edicao": "2021-01-30T20:13:35.515Z"
  },
  {
    "_id": "6015bbaa885d7a59783b5e2d",
    "country_id": "601594203e4a3f31ecd2af99",
    "pais": "Brasil",
    "url_bandeira": "urldabandeira",
    "place": "Local no brasil",
    "meta": "2030-12-01T00:00:00.000Z",
    "data_criacao": "2021-01-30T20:03:54.566Z",
    "data_edicao": "2021-01-30T20:04:19.471Z"
  }
]
```
####3. Buscar um local pelo ID:  **GET** `/api/v1/countrys/:id` 


Consulta realizada com sucesso: **STATUS: 200 OK**
```javascript

//api/v1/places/6015bdef136d165b7eb0a1c6

[
  {
    "_id": "6015bdef136d165b7eb0a1c6",
    "country_id": "601594203e4a3f31ecd2af99",
    "pais": "Brasil",
    "url_bandeira": "urldabandeira",
    "place": "Praia de Guarapari",
    "meta": "2022-01-01T00:00:00.000Z",
    "data_criacao": "2021-01-30T20:13:35.515Z",
    "data_edicao": "2021-01-30T20:13:35.515Z"
  }
]
 ```
####4. Excluir um local:  **DELETE** `/api/v1/places/:id` 


Exclusão realizada com sucesso: **STATUS: 200 OK**

```javascript
{
  "result": {
    "n": 0,
    "opTime": {
      "ts": "6923646233596657665",
      "t": 4
    },
    "electionId": "7fffffff0000000000000004",
    "ok": 1,
    "$clusterTime": {
      "clusterTime": "6923646233596657665",
      "signature": {
        "hash": "IiZM/0Huzcu14d8FsMVrcGdKDeA=",
        "keyId": "6918846762262200323"
      }
    },
    "operationTime": "6923646233596657665"
  },
  "connection": {
    "_events": {},
    "_eventsCount": 4,
    "id": 1,
    "address": "35.247.244.88:27017",
    "bson": {},
    "socketTimeout": 0,
    "host": "cluster0-shard-00-02.d4gur.mongodb.net",
    "port": 27017,
    "monitorCommands": false,
    "closed": false,
    "destroyed": false,
    "lastIsMasterMS": 28
  },
  "deletedCount": 0,
  "n": 0,
  "opTime": {
    "ts": "6923646233596657665",
    "t": 4
  },
  "electionId": "7fffffff0000000000000004",
  "ok": 1,
  "$clusterTime": {
    "clusterTime": "6923646233596657665",
    "signature": {
      "hash": "IiZM/0Huzcu14d8FsMVrcGdKDeA=",
      "keyId": "6918846762262200323"
    }
  },
  "operationTime": "6923646233596657665"
}
```
####5. Editar um local:  **PUT** `/api/v1/places/:id`
Corpo da requisição:
```javascript
{
"place" : "Novo Local",
"meta" : "12/2030"
}
```
Edição realizada com sucesso: **STATUS: 200 OK**

```javascript
[
  {
    "_id": "6015bbaa885d7a59783b5e2d",
    "country_id": "601594203e4a3f31ecd2af99",
    "pais": "Brasil",
    "url_bandeira": "urldabandeira",
    "place": "Novo Local",
    "meta": "2030-12-01T00:00:00.000Z",
    "data_criacao": "2021-01-30T20:03:54.566Z",
    "data_edicao": "2021-01-30T20:04:19.471Z"
  }
]
```
