import fastify, { FastifyInstance, FastifyReply, FastifyRequest, FastifyServerOptions } from 'fastify'
import { router } from './routes'
import { ROUTES_WITHOUT_AUTHENTICATION } from '../../config'
import { authMiddleware } from '../middlewares/authorization.mw'
import * as bcrypt from 'bcrypt'
import crypto from 'crypto'

export const start = (fastifyConfig: FastifyServerOptions): FastifyInstance => {
  const app = fastify(fastifyConfig)

  app.register(router)

  /* Hooks */
  app.addHook('onRequest', async (req: FastifyRequest, reply: FastifyReply) => {
    const shouldAuthenticateRoute = !ROUTES_WITHOUT_AUTHENTICATION.includes(req.routeOptions.url!)
    if (shouldAuthenticateRoute) {
      authMiddleware(req, reply)
    }
  })

  app.addHook('preHandler', async (req: any, reply: FastifyReply) => {
    const isLoginRoute = req.routeOptions.url === '/login'
    if (isLoginRoute) {
      req.body.password = crypto.createHash(process.env.HASH_ALG!).update(req.body.password).digest('hex')
    }
  })

  return app
}
