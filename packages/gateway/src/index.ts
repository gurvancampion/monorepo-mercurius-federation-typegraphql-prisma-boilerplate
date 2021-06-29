import Fastify from 'fastify'
import mercurius from 'mercurius'
import AltairFastify from 'altair-fastify-plugin'
import waitOn = require('wait-on')
import { WaitOnOptions } from 'wait-on'
import { IS_DEV } from 'common'

export const app = Fastify({
  logger: IS_DEV,
})

async function bootstrap() {
  try {
    const options: WaitOnOptions = {
      resources: ['tcp:4001', 'tcp:4002'],
    }
    // Wait others services to start
    await waitOn(options)

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
      },
      graphiql: false,
      ide: false,
      federationMetadata: true,
    })

    app.register(AltairFastify, {
      path: '/altair',
      baseURL: '/altair/',
      // 'endpointURL' should be the same as the mercurius 'path'
      endpointURL: '/graphql',
    })

    app.listen(4000)
  } catch (e) {
    app.log.error(e)
  }
}

bootstrap()
