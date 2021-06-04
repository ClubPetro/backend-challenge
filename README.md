# Desafio de Backend

<img src="./img/logo-clubpetro.png" style="margin-left: 100px"
     alt="Clubpetro" width="300">

## Descrição
Desenvolvimento de uma Api para lugares aos quais se deseja conhecer ao redor do mundo. Os principais dados armazenados são: <b>country</b> , <b>place</b>, <b>goal</b>, <b>urlflag</b>, do local  ao qual se deseja realizar a visita. O desenvolvimento foi realizado utilizando o framework [Nestjs](https://github.com/nestjs/nest)


##### Funcionalidades
  - Criar novos lugares; 
   - Não é possivel adionar lugares repetidos para o mesmo pais;
  - Obter todos os lugares cadastrados;
  - Obter um lugar cadastrado de acordo com o id;
  - Atualizar o local e a meta cadastrada para um determinado pais; 
  - Remover um lugar de acordo com o id;;

## Dependências do ambiente
- [Docker e Docker-Compose](https://docs.docker.com/docker-for-windows/install/)
- [Yarn](https://classic.yarnpkg.com/en/docs/install/#windows-stable)
- [Git](https://github.com/git-guides/install-git)
- [Node.js](https://nodejs.org/en/)



## Installation

```bash

#clonar o repositorio 
$ git clone https://github.com/DaniloRicardoCrabi/backend-challenge.git

# acessa a pasta principal do projeto
$ cd backend-challenge

# instalar as dependencias do projeto
$ yarn install


```

## Running the app

```bash

#subir o conteinar do postgres
$ docker-compose up -d

#iniciar a aplicação
$ yarn  start
```

## API endpoints

 - Documentação detalhada no Swegger : http://localhost:3000/backend-challenge/#/default 
 (Após inicializar a aplicação)  

###### POST
- Cadastrar novos lugares; 
	http://localhost:3000/places
	 - Requer:  
	 	 - country
		 - place
		 - goal 
		 	
###### GET
- Obter todos os lugares cadastrados;
   - http://localhost:3000/places
   
###### GET
- Obter todos um lugar cadastrado pelo id;
	- http://localhost:3000/places/id
		- Required: id

###### PUT
- Modifica <b>place</b> ou goal cadastrado pelo id;
	- http://localhost:3000/places/id
		- Requer: id
		- Opcional: place or goal

###### DELETE
- Remove um lugar cadastrado 
	-  http://localhost:3000/places/id
		- Requer: id

#### Linguagens e libs utilizadas:

- [Nest,js](https://github.com/nestjs/nest);
- TypeScript;
- [TypeORM](https://typeorm.io/#/);
- [Docker](https://www.docker.com/);
