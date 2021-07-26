# monorepo-mercurius-federation-typegraphql-prisma-boilerplate

## Description

## Getting started

### Prerequisites
- [Node.js](https://nodejs.org/en/) >= `14`
- [Pnpm](https://pnpm.io/)
- Docker to run the databases, or you can modify the database connection for each service

## Setup

1. Clone repo
2. Copy environment variables `cp .env.dev .env` in each service with your configuration
3. Install all dependencies by running `pnpm install`
4. Init/Start all databases: `pnpm run docker:up`
5. Run database migrations: `pnpm run migrate:dev`
6. Run database seed // TODO

## Development

- Start all services: `pnpm run dev`
- Playground gateway: http://127.0.0.1:4000/altair

## Production

- Build all services: `pnpm run build`
- Start all services: `pnpm run start`

### Docs
- [Mercurius](https://mercurius.dev/)
- [Typegraphql](https://typegraphql.com/)
- [Prisma + Typegraphql](https://prisma.typegraphql.com/)

### Resources

### Examples

#### Monorepo
- https://github.com/PabloSzx/monorepo-gql

#### Repos
- https://github.com/juusot/federation-graphql-poc
- https://github.com/sagahead-io/ecommerce-blueprint
- https://github.com/leoltl/microservices-scaffold
- https://github.com/chagadev/fullstack-boilerplate

Solutions:
https://github.com/autotelic/mercurius-remote-schema
Nexus & Typegraphql doesn't support key directives for federation, try stitching schema?
https://github.com/gmac/schema-stitching-handbook
https://github.com/gmac/schema-stitching-handbook/tree/master/subservice-languages/javascript

#### Issues:
- Mercurius does not merge Query, Mutation and Subscription with extend: 
  https://github.com/mercurius-js/mercurius/issues/273
  https://github.com/mercurius-js/mercurius/issues/348
