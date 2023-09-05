
## Description

API pour PortFolio V2

## Installation

```bash
$ npm install
```
* Creer le .env avec vos identifiant de base de données (Mysql/MariaDb...)
```
PORT_DEV=3000
DATABASE_HOST=localhost
DATABASE_PORT=
DATABASE_USER=
DATABASE_NAME=
ACCESS_TOKEN_SECRET_KEY=
```
* Initialiser la base de donnée
```bash
npm run db:create
```
## Demmarer l'API

```bash
# development
$ npm run start

# watch mode
$ npm run dev

# production mode
$ npm run start:prod
```
## Open API
```
localhost:PORT_DEV/api
```
## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
# api_portfolio
