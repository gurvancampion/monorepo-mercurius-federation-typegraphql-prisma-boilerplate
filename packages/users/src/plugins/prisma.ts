import fp from 'fastify-plugin'
import { FastifyPluginAsync } from 'fastify'
import { PrismaClient } from '../schema/@generated/prisma-client'
declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaClient
  }
}

export const prismaPlugin: FastifyPluginAsync = fp(async (app, options) => {
  const prisma = new PrismaClient({
    log: ['error', 'warn'],
  })

  await prisma.$connect()
  app.decorate('prisma', prisma)

  app.addHook('onClose', async (instance) => {
    instance.log.info(`Disconnecting Prisma from ${process.env.POSTGRES_DB} DB`)
    await instance.prisma.$disconnect()
  })
})
