install:
	npm install

dev:
	npm run start:dev

build:
	npm run build

up: build
	docker-compose up -d

down:
	docker-compose down --remove-orphans

.PHONY: test
test:
	npm run test

test/updateSnapshots:
	npm run test:updateSnapshots

test/cov:
	npm run test:cov

test/e2e:
	npm run test:e2e

test/e2e/updateSnapshots:
	npm run test:e2e:updateSnapshots

format:
	npm run lint
	npm run format
