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
- [Nexus prisma](https://github.com/prisma/nexus-prisma)
- [Nexus prisma plugin](https://nexusjs.org/docs/plugins/prisma/overview)
- [Nexus best practices](https://nexusjs.org/docs/guides/best-practices)

### Resources

### Examples

#### Monorepo
- https://github.com/PabloSzx/monorepo-gql

#### Articles
- https://dev.to/studio_hungry/how-to-create-a-graphql-api-with-prisma-and-nexus-144j
- https://zach.codes/nexus-prisma-is-the-future-of-backend/

#### Repos
- https://github.com/m-leon/backend-boilerplates/tree/main/boilerplates/graphql-federation
- https://github.com/ricardoalmeida/federation-nexus-prisma
- https://github.com/juusot/federation-graphql-poc
- https://github.com/2color/fastify-graphql-nexus-prisma
- https://github.com/graphql-nexus/nexus-plugin-prisma/tree/main/examples/blog
- https://github.com/chagadev/fullstack-boilerplate

Nexus federation doesn't support key directives, we have to rely on stitching schema
https://github.com/gmac/schema-stitching-handbook
https://github.com/nayaabkhan/nexus-stitching-example
https://github.com/gmac/schema-stitching-handbook/tree/master/subservice-languages/javascript
