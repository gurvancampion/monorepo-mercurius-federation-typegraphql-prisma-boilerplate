import 'reflect-metadata'
import Fastify, { FastifyReply, FastifyRequest } from 'fastify'
import mercurius from 'mercurius'
import AltairFastify from 'altair-fastify-plugin'
import { isDevelopment } from 'common'

import { prismaPlugin } from './plugins/prisma'
import s from './schema'
import { Context } from './context'
import { app } from '../../gateway'

async function main() {
  try {
    const app = Fastify({
      logger: isDevelopment,
    })

    app.register(prismaPlugin)

    const schema = await s

    app.register(mercurius, {
      schema,
      federationMetadata: true,
      context: (request: FastifyRequest, reply: FastifyReply): Context => {
        return {
          prisma: app.prisma,
          request,
          reply,
        }
      },
    })

    app.register(AltairFastify, {
      path: '/altair',
      baseURL: '/altair/',
      // 'endpointURL' should be the same as the mercurius 'path'
      endpointURL: '/graphql',
    })

    app.listen(4002)
  } catch (e) {
    app.log.error(e)
  }
}

main()
