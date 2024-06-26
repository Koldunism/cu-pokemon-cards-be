import fastify, { FastifyInstance, FastifyServerOptions } from 'fastify'
import { router } from './routes'

export const start = (fastifyConfig: FastifyServerOptions): FastifyInstance => {
  const app = fastify(fastifyConfig)

  app.register(router)

  return app
}
