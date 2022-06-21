import { AddAccount } from '../../../../domain/usecases/add-account'
import { badRequest, forbidden, ok, serverError } from '../../../helpers/http/http-helper'
import { Validation } from '../../../protocols/validation'
import { Controller, HttpRequest, HttpResponse } from '../../../protocols'
import { Authentication } from '../../../../domain/usecases/authentication'
import { EmailInUseError } from '../../../errors'

export class SignUpController implements Controller {
  constructor (
    private readonly addAccount: AddAccount,
    private readonly validation: Validation,
    private readonly authentication: Authentication
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { name, email, password } = httpRequest.body
      const account = await this.addAccount.add({
        name,
        email,
        password
      })
      if (!account) {
        return forbidden(new EmailInUseError())
      }
      const authAccount = await this.authentication.auth({ email, password })
      return ok(authAccount)
    } catch (error) {
      return serverError(error)
    }
  }
}
