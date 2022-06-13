import { AccountModel } from '../../domain/models/account'
import { LoadAccountByEmailRepository } from '../protocols/db/load-account-by-email-repository'

export class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
  async loadByEmail (email: string): Promise<AccountModel> {
    const account: AccountModel = {
      id: 'any_id',
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'hashed_password'
    }
    return await Promise.resolve(account)
  }
}
