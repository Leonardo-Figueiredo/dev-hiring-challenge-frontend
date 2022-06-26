# Ateliware - Dev Hiring Challenge - Client

> The challenge is to create a application to comunicate with GithubAPI and implement the features bellow.
>
> - Button to search and save most featured repositories of five languages.
> - List found repositories.
> - Create repository details view.

## Live preview

[https://ateliware-prod-frontend.herokuapp.com](https://ateliware-prod-frontend.herokuapp.com)

## Technologies

- [ChakraUI](https://chakra-ui.com)
- [GraphQL](https://graphql.org)
- [Next.js](https://nextjs.org)

## Application Architecture

### API

- [Dev Hiring Challenge API](https://github.com/Leonardo-Figueiredo/dev-hiring-challenge)

### Client

- [Dev Hiring Challenge Client](https://github.com/Leonardo-Figueiredo/dev-hiring-challenge-frontend) (this repository)

---

## Dependencies

- [Node ^16.15.1](https://nodejs.org/dist/v16.15.1/docs/api/)
- [Yarn ^1.22.19](https://yarnpkg.com)
- [Dev Hiring Challenge Api](#api)

_The dependencies above are unnecessary if you use docker, the ones below are required._

- [Docker Engine ^20.10.12](https://docs.docker.com/engine/install/)
- [Docker Compose ^1.29.2](https://docs.docker.com/compose/install/)

---

## Base Setup

- Run `$ cp .env.sample .env` (or just make a copy), populate .env file with valid key.

## Local Setup (without Docker, with Docker [go to](#docker-setup-🐳))

- Follow the step above on [Base Setup](#base-setup)
- Run `$ yarn` to install all dependencies.
- To start Ateliware Challenge Client in development mode with `$ yarn dev`.
- Build production Ateliware Challenge Client with `$ yarn build`.
- To start Ateliware Challenge Client in production mode with `$ yarn start`.
_You can add a -p flag to set a custom port_

## Docker Setup 🐳

- Follow the steps above on [Base Setup](#base-setup).
- Run `$ docker-compose build development` to create development or production image.
- To execute **production** container use `$ docker-compose up production`.
- If you want to execute on background, use **-d** flag, example: `$ docker-compose up -d production`.
- To execute **development** container use `$ docker-compose up development`.
- Stop containers and dependencies, execute `$ docker-compose stop`.
  - To stop a especific container execute `$ docker-compose stop development`.
- Now run `$ docker-compose up -d development` and Ateliware Challenge Client should be working fine. 🚀
- To up a container with new build, you should run `$ docker-compose up --build -d production`.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

_If you set a port with -p, you should enter on <http://localhost:APP_PORT>_

[Challenge Original Repository](https://github.com/ateliware/dev-hiring-challenge)

If you have any problems, send me a e-mail [leo.nardorf22@gmail.com](mailto:leo.nardorf22@gmail.com)
