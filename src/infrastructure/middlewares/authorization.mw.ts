import { FastifyRequest, FastifyReply } from 'fastify'
import * as jwt from 'jsonwebtoken'
import { HttpResponse } from '../http/httpResponses/HttpResponse'

export const authMiddleware = async (req: FastifyRequest, reply: FastifyReply) => {
  const httpResponse = new HttpResponse()
  try {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) {
      return httpResponse.unauthorized(reply, 'Unauthorized - Missing authorization token')
    }

    jwt.verify(token, process.env.JWT_SECRET!)
  } catch (error: any) {
    switch (error.name) {
      case 'JsonWebTokenError':
        return httpResponse.badRequest(reply, 'Unauthorized - Invalid token')
      case 'TokenExpiredError':
        return httpResponse.unauthorized(reply, 'Unauthorized - Expired token')
      case 'NotBeforeError':
        return httpResponse.unauthorized(reply, 'Unauthorized - Token not active yet')
      default:
        return httpResponse.internalServerError(reply, 'Unexpected error at token verification')
    }
  }
}
