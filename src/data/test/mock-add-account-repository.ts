import { AccountModel } from '@/domain/models/account'
import { AddAccountModel } from '@/domain/usecases/account/add-account'
import { AddAccountRepository } from '@/data/protocols/db/account/add-account-repository'
import { mockFakeAddAccountResult } from '@/data/test/mock-fake-add-account-result'

export class AddAccountRepositoryStub implements AddAccountRepository {
  async add (account: AddAccountModel): Promise<AccountModel> {
    return await Promise.resolve(mockFakeAddAccountResult())
  }
}
