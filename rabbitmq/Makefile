install:
	npm install

infra/up:
	docker-compose up -d rabbitmq
	sleep 2

dev/publisher: infra/up
	npm run start:dev:publisher

dev/consumer: infra/up
	npm run start:dev:consumer

build:
	npm run build

up: build
	docker-compose up --build -d

down:
	docker-compose down --remove-orphans

test:
	npm run test

test/cov:
	npm run test:cov

format:
	npm run lint
	npm run format
