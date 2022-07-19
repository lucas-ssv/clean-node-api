import { AccountModel } from '@/domain/models/account'
import { AddAccount, AddAccountModel } from '@/domain/usecases/account/add-account'
import { mockFakeAccount } from './mock-fake-account'

export class AddAccountStub implements AddAccount {
  async add (account: AddAccountModel): Promise<AccountModel> {
    return await Promise.resolve(mockFakeAccount())
  }
}
