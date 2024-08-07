import fastify, { FastifyInstance, FastifyReply, FastifyRequest, FastifyServerOptions } from 'fastify'
import { router } from './routes'
import { ROUTES_WITHOUT_AUTHENTICATION } from '../../config'
import { authMiddleware } from '../middlewares/authorization.mw'
import crypto from 'crypto'
import cors from '@fastify/cors'

export const start = (fastifyConfig: FastifyServerOptions): FastifyInstance => {
  const app = fastify(fastifyConfig)

  app.register(cors, {
    origin: 'http://localhost:3001', // URL del frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true
  })

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
      req.body.passwordHash = crypto.createHash(process.env.HASH_ALG!).update(req.body.passwordHash).digest('hex')
    }
  })

  return app
}
