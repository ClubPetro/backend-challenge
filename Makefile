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
	docker-compose exec api npm run test:cov -- --maxWorkers=1

exec:
	docker-compose exec api sh
