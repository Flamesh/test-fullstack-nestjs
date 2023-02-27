## Introduce

This is backend for testing from 3IPK team. This backend having functions:

- Authentication: login, register, logout, refresh token
- Storage books: create, update, delete, get all, get by slug

## Installation

```bash
$ docker-compose up -d
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```
