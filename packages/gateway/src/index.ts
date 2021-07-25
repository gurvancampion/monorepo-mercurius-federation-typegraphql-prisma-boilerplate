import Fastify from 'fastify'
import mercurius from 'mercurius'
import AltairFastify from 'altair-fastify-plugin'
import waitOn = require('wait-on')
import { WaitOnOptions } from 'wait-on'
import { isDevelopment } from 'common'

export const app = Fastify({
  logger: isDevelopment,
})

async function main() {
  try {
    if (isDevelopment) {
      const options: WaitOnOptions = {
        resources: ['tcp:4001', 'tcp:4002'],
      }
      // Wait others services to start
      await waitOn(options)
    }

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

    app.register(AltairFastify, {
      path: '/altair',
      baseURL: '/altair/',
      // 'endpointURL' should be the same as the mercurius 'path'
      endpointURL: '/graphql',
    })

    await app.listen(4000)
  } catch (e) {
    app.log.error(e)
  }
}

main()
