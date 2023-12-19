
## Description

API pour PortFolio V2

## Installation

Avoir une base de donnée fonctionelle au prealable ou utiliser le docker-compose du projet
```bash
$ docker-compose up -d
```
Attention => docker-compose prevu pour mac sur puce Apple Silicon ARM64

```bash
$ npm install
```
* Creer le .env avec vos identifiant de base de données (Mysql/MariaDb...)
```
PORT_DEV=3000
DATABASE_HOST=localhost
DATABASE_PORT=le-port-de-la-bdd
DATABASE_USER=le-nom-du-user-de-la-bdd
DATABASE_PASSWORD=password-de-la-bdd
DATABASE_NAME=le-nom-de-votre-bdd
ACCESS_TOKEN_SECRET_KEY=phrase-secrete-pour-token
CONTACT_USERNAME=votre-email-de-contact
HOSTNAME=le-nom-du-serveur-de-mail
CONTACT_PASSWORD=le-password-de-votre-serveur-email
NO_REPLY_ADRESS=email-no-reply

```
### Initialiser la base de donnée
* option 1: generer la bdd avec la migration
```bash
npm run db:create
```
* option 2: Creer une base de donnee avec phpMyAdmin et importer le jeu de test fourni dans le dossier sql
* connexion admin : admin - psw : admin
* connexion user : user - psw :user
## Demmarer l'API

```bash
# development
$ npm run start

# watch mode
$ npm run dev

# production mode
$ npm run start:prod
```
## TypeOrmCli
```bash
# Genrerer une migration automatique
$ npm run migration:generate

# Creer une migration
$ npm run migration:create

# Appliquer la/les migrations
$ npm run migration:run

# Rollback de la derniere migration
$ npm run migration:revert
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


# api_portfolio
