import { FastifyPluginAsync } from 'fastify'
import fp from 'fastify-plugin'
import mercurius from 'mercurius'

const mercuriusPlugin: FastifyPluginAsync = fp(
  async (app) => {
    app.register(mercurius, {
      gateway: {
        services: [
          {
            name: 'users',
            url: 'http://127.0.0.1:4001/graphql',
          },
          {
            name: 'posts',
            url: 'http://127.0.0.1:4002/graphql',
          },
        ],
        // pollingInterval: 2000,
      },
      graphiql: false,
      ide: false,
    })
  },
  {
    name: 'mercurius',
  },
)

export default mercuriusPlugin
