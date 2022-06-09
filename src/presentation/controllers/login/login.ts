import { Authentication } from '../../../domain/usecases/authentication'
import { badRequest, ok, serverError, unauthorized } from '../../helpers/http/http-helper'
import { Validation } from '../../protocols/validation'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'

export class LoginController implements Controller {
  constructor (
    private readonly authentication: Authentication,
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { email, password } = httpRequest.body
      const authAccount = await this.authentication.auth(email, password)
      if (!authAccount) {
        return unauthorized()
      }
      return ok({
        name: 'any_name',
        token: 'any_token'
      })
    } catch (error) {
      return serverError(error)
    }
  }
}
