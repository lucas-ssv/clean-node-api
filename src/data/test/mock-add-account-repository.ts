import { AccountModel } from '../../domain/models/account'
import { AddAccountModel } from '../../domain/usecases/add-account'
import { AddAccountRepository } from '../protocols/add-account-repository'
import { mockFakeAddAccountResult } from './mock-fake-add-account-result'

export class AddAccountRepositoryStub implements AddAccountRepository {
  async add (account: AddAccountModel): Promise<AccountModel> {
    return await Promise.resolve(mockFakeAddAccountResult())
  }
}
