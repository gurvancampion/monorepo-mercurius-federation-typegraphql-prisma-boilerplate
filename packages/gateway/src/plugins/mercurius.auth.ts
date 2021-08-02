import { FastifyPluginAsync } from 'fastify'
import fp from 'fastify-plugin'
import mercuriusAuth from 'mercurius-auth'

const mercuriusAuthPlugin: FastifyPluginAsync = fp(
  async (app, options) => {
    app.register(mercuriusAuth, {
      authContext(context) {
        console.log('authContext', context.reply.request.headers)
        return {
          identity: context.reply.request.headers['x-user'],
        }
      },
      async applyPolicy(authDirectiveAST, parent, args, context, info) {
        console.log('applyPolicy', context)

        return context.auth.identity === 'admin'
      },
      authDirective: 'auth',
    })
  },
  {
    dependencies: ['mercurius'],
  },
)

export default mercuriusAuthPlugin
