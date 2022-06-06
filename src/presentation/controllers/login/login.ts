import { MissingParamError } from '../../errors'
import { badRequest } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { EmailValidator } from '../signup/signup-protocols'

export class LoginController implements Controller {
  constructor (private readonly emailValidator: EmailValidator) {}

  async handle (request: HttpRequest): Promise<HttpResponse> {
    if (!request.body.email) {
      return badRequest(new MissingParamError('email'))
    }
    if (!request.body.password) {
      return badRequest(new MissingParamError('password'))
    }
    this.emailValidator.isValid(request.body.email)
  }
}
