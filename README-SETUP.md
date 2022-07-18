- [Atributos](#atributos)
- [Como executar](#como-executar)
- [Rotas aplicação](#rotas-aplicação)

## Atributos
    country == pais
    place == local
    goal == meta
    urlFlag == url da bandeira

## Como executar
    Basta dar um docker-compose up

## Rotas aplicação
    POST /travels
    body:{
        "country": "Brasil",
        "place":"Fernando de Noronha",
        "goal": "02/2023"
        "urlFlag": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flag_of_Brazil.svg/275px-Flag_of_Brazil.svg.png"
    }
    
    GET /travels

    PATCH /travels/:id
    body:{
        "place":"Fernando de Noronha",
        "goal": "06/2023"
    }

    DELETE /travels/:id