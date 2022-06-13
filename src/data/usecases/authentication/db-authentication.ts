import { AuthAccount } from '../../../domain/models/auth-account'
import { Authentication, AuthenticationModel } from '../../../domain/usecases/authentication'
import { HashCompare } from '../../protocols/criptography/hash-compare'
import { Encrypter } from '../../protocols/criptography/encrypter'
import { LoadAccountByEmailRepository } from '../../protocols/db/load-account-by-email-repository'
import { UpdateAccessTokenRepository } from '../../protocols/db/update-access-token-repository'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashCompare: HashCompare,
    private readonly encrypter: Encrypter,
    private readonly updateAccessTokenRepositoryStub: UpdateAccessTokenRepository
  ) {}

  async auth (params: AuthenticationModel): Promise<AuthAccount> {
    const account = await this.loadAccountByEmailRepository.load(params.email)
    if (account) {
      const isCompareValid = await this.hashCompare.compare(params.password, account.password)
      if (isCompareValid) {
        const token = await this.encrypter.encrypt(account.id)
        await this.updateAccessTokenRepositoryStub.updateAccessToken(account.id, token)
        return {
          name: account.name,
          token
        }
      }
    }
    return null
  }
}
