import Fastify from 'fastify'
import autoload from 'fastify-autoload'
import waitOn = require('wait-on')
import { WaitOnOptions } from 'wait-on'
import { isDevelopment } from 'common'
import { join } from 'path'

const gateway = Fastify({
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

    gateway.register(autoload, {
      dir: join(__dirname, 'plugins'),
    })

    await gateway.listen(4000)
  } catch (e) {
    gateway.log.error(e)
  }
}

main()
