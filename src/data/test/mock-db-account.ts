import { AccountModel } from '@/domain/models/account'
import { AddAccountParams } from '@/domain/usecases/account/add-account'
import { AddAccountRepository } from '@/data/protocols/db/account/add-account-repository'
import { LoadAccountByEmailRepository } from '@/data/protocols/db/account/load-account-by-email-repository'
import { UpdateAccessTokenRepository } from '@/data/protocols/db/account/update-access-token-repository'
import { LoadAccountByTokenRepository } from '../protocols/db/account/load-account-by-token-repository'

export const mockAddAccountResult = (): AccountModel => ({
  id: 'any_id',
  name: 'any_name',
  email: 'any_email',
  password: 'hashed_password'
})

export class AddAccountRepositoryStub implements AddAccountRepository {
  async add (account: AddAccountParams): Promise<AccountModel> {
    return await Promise.resolve(mockAddAccountResult())
  }
}

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

export class UpdateAccessTokenRepositoryStub implements UpdateAccessTokenRepository {
  async updateAccessToken (id: string, token: string): Promise<void> {
    return await Promise.resolve()
  }
}
export class LoadAccountByTokenRepositoryStub implements LoadAccountByTokenRepository {
  async loadByToken (token: string, role?: string): Promise<AccountModel> {
    return await Promise.resolve(mockAddAccountResult())
  }
}
