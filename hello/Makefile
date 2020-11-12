install:
	npm install

dev:
	npm run start:dev

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
