init:
	cp .env.example .env
	make up

up:
	docker-compose up -d

down:
	docker-compose down

build:
	docker-compose up -d --build

cov:
	docker-compose exec api npm run test:cov

exec:
	docker-compose exec api sh
