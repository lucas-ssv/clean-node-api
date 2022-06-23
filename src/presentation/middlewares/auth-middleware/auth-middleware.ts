import { LoadAccountByToken } from '../../../domain/usecases/load-account-by-token'
import { AccessDeniedError } from '../../errors'
import { forbidden } from '../../helpers/http/http-helper'
import { HttpRequest, HttpResponse } from '../../protocols'
import { Middleware } from '../../protocols/middleware'

export class AuthMiddleware implements Middleware {
  constructor (private readonly loadAccountByToken: LoadAccountByToken) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const token = httpRequest.headers?.['x-access-token']
    if (token) {
      await this.loadAccountByToken.load(token)
    }
    return forbidden(new AccessDeniedError())
  }
}
