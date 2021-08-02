import { FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify'
import fp from 'fastify-plugin'
import mercurius from 'mercurius'

import s from '../schema'
import { Context } from '../context'

const mercuriusPlugin: FastifyPluginAsync = fp(async (app) => {
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
})

export default mercuriusPlugin
