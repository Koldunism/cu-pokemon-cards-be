import { FASTIFYCONFIG, SERVERCONFIG } from '../../config'
import { start } from './app'

export const bootstrap = async (host: string, port: number): Promise<any> => {
  try {
    const server = start(FASTIFYCONFIG)

    const address = await server.listen({ port, host })

    console.log(`🚀 Server listening on ${address}`)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

bootstrap(SERVERCONFIG.host, +SERVERCONFIG.port)
