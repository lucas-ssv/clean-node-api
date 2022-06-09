import { AuthAccount } from '../../../domain/models/auth-account'
import { Authentication, AuthenticationModel } from '../../../domain/usecases/authentication'
import { LoadAccountByEmailRepository } from '../../protocols/db/load-account-by-email-repository'

export class DbAuthentication implements Authentication {
  constructor (private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository) {}

  async auth (params: AuthenticationModel): Promise<AuthAccount> {
    await this.loadAccountByEmailRepository.load(params.email)
    return null
  }
}
