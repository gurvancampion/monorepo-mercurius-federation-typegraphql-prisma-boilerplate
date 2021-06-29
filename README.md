# monorepo-mercurius-federation-typegraphql-prisma-boilerplate

## Description

## Getting started

### Prerequisites
- Node.js >= `14`
- pnpm
- Docker to run the databases, or you can modify the database connection for each service

## Setup

1. Clone repo
2. Copy environment variables `cp .env.dev .env` in each service with your configuration
3. Install all dependencies by running `pnpm install`
4. Run database migrations // TODO
5. Run database seed // TODO


## Development

- Start all services with the command: `pnpm run dev`

## Production

- Build all services with the command: `pnpm run build`
- Start all services with the command: `pnpm run start`

Examples:
- https://github.com/PabloSzx/monorepo-gql
- https://github.com/2color/fastify-graphql-nexus-prisma
