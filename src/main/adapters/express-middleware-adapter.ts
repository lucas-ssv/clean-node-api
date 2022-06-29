import { NextFunction, Request, RequestHandler, Response } from 'express'
import { HttpRequest } from '../../presentation/protocols'
import { Middleware } from '../../presentation/protocols/middleware'

export const adaptMiddleware = (middleware: Middleware): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const httpRequest: HttpRequest = {
      headers: req.headers
    }
    const httpResponse = await middleware.handle(httpRequest)
    if (httpResponse.statusCode === 200) {
      Object.assign(req, httpRequest.body)
      next()
    } else {
      return res.status(httpResponse.statusCode).json(httpResponse.body)
    }
  }
}
