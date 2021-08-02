import { FastifyPluginAsync } from 'fastify'
import fp from 'fastify-plugin'
import AltairFastify from 'altair-fastify-plugin'

const altairPlugin: FastifyPluginAsync = fp(async (app, options) => {
  app.register(AltairFastify, {
    path: '/altair',
    baseURL: '/altair/',
    // 'endpointURL' should be the same as the mercurius 'path'
    endpointURL: '/graphql',
  })
})

export default altairPlugin
