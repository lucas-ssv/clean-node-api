import { AccountModel } from '@/domain/models/account'
import { AddAccount, AddAccountParams } from '@/domain/usecases/account/add-account'
import { mockAccountModel } from '@/domain/test'
import { LoadAccountByToken } from '@/domain/usecases/account/load-account-by-token'

export class AddAccountStub implements AddAccount {
  async add (account: AddAccountParams): Promise<AccountModel> {
    return await Promise.resolve(mockAccountModel())
  }
}

export class LoadAccountByTokenStub implements LoadAccountByToken {
  async load (accessToken: string, role?: string): Promise<AccountModel> {
    return await Promise.resolve(mockAccountModel())
  }
}
