import 'reflect-metadata'
import Fastify from 'fastify'
import autoload from 'fastify-autoload'
import { isDevelopment } from 'common'
import { join } from 'path'

const app = Fastify({
  logger: isDevelopment,
})

async function main() {
  try {
    app.register(autoload, {
      dir: join(__dirname, 'plugins'),
    })

    await app.listen(4001)
  } catch (e) {
    app.log.error(e)
  }
}

main()
