import { AccountModel } from '@/domain/models/account'
import { AddAccount, AddAccountParams } from '@/domain/usecases/account/add-account'
import { mockFakeAccount } from './mock-fake-account'

export class AddAccountStub implements AddAccount {
  async add (account: AddAccountParams): Promise<AccountModel> {
    return await Promise.resolve(mockFakeAccount())
  }
}
