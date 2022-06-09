import { AuthAccount } from '../../../domain/models/auth-account'
import { Authentication, AuthenticationModel } from '../../../domain/usecases/authentication'
import { HashCompare } from '../../protocols/criptography/hash-comparer'
import { LoadAccountByEmailRepository } from '../../protocols/db/load-account-by-email-repository'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashCompare: HashCompare
  ) {}

  async auth (params: AuthenticationModel): Promise<AuthAccount> {
    const account = await this.loadAccountByEmailRepository.load(params.email)
    if (account) {
      await this.hashCompare.compare(params.password, account.password)
    }
    return null
  }
}
