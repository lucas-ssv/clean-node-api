import { AuthAccount } from '@/domain/models/auth-account'
import { Authentication, AuthenticationModel } from '@/domain/usecases/authentication'
import { HashCompare } from '@/data/protocols/criptography/hash-compare'
import { Encrypter } from '@/data/protocols/criptography/encrypter'
import { LoadAccountByEmailRepository } from '@/data/protocols/db/account/load-account-by-email-repository'
import { UpdateAccessTokenRepository } from '@/data/protocols/db/account/update-access-token-repository'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashCompare: HashCompare,
    private readonly encrypter: Encrypter,
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepository
  ) {}

  async auth (params: AuthenticationModel): Promise<AuthAccount> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(params.email)
    if (account) {
      const isCompareValid = await this.hashCompare.compare(params.password, account.password)
      if (isCompareValid) {
        const token = await this.encrypter.encrypt(account.id)
        await this.updateAccessTokenRepository.updateAccessToken(account.id, token)
        return {
          name: account.name,
          token
        }
      }
    }
    return null
  }
}
