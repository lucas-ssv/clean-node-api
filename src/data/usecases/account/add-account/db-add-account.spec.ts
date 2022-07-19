import { AddAccount } from '@/domain/usecases/account/add-account'
import { AddAccountRepository } from '@/data/protocols/db/account/add-account-repository'
import { Hasher } from '@/data/protocols/criptography/hasher'
import { AddAccountRepositoryStub } from '@/data/test/mock-add-account-repository'
import { mockFakeAddAccountResult } from '@/data/test/mock-fake-add-account-result'
import { HasherStub } from '@/data/test/mock-hasher'
import { mockFakeAccountData } from '@/data/test/mock-fake-account-data'
import { DbAddAccount } from '@/data/usecases/account/add-account/db-add-account'
import { LoadAccountByEmailRepository } from '@/data/protocols/db/account/load-account-by-email-repository'
import { AccountModel } from '@/domain/models/account'

type SutTypes = {
  sut: AddAccount
  hasherStub: Hasher
  addAccountRepositoryStub: AddAccountRepository
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepositoryStub
}

class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
  async loadByEmail (email: string): Promise<AccountModel> {
    return await new Promise(resolve => resolve(null)) as any
  }
}

const makeSut = (): SutTypes => {
  const addAccountRepositoryStub = new AddAccountRepositoryStub()
  const hasherStub = new HasherStub()
  const loadAccountByEmailRepositoryStub = new LoadAccountByEmailRepositoryStub()
  const sut = new DbAddAccount(hasherStub, addAccountRepositoryStub, loadAccountByEmailRepositoryStub)
  return {
    sut,
    hasherStub,
    addAccountRepositoryStub,
    loadAccountByEmailRepositoryStub
  }
}

describe('DbAddAccount Usecase', () => {
  test('Should call Hasher with correct password', async () => {
    const { sut, hasherStub } = makeSut()
    const hashSpy = jest.spyOn(hasherStub, 'hash')
    await sut.add(mockFakeAccountData())
    expect(hashSpy).toHaveBeenCalledWith('valid_password')
  })

  test('Should throw if Hasher throws', async () => {
    const { sut, hasherStub } = makeSut()
    jest.spyOn(hasherStub, 'hash').mockRejectedValueOnce(new Error())
    const promise = sut.add(mockFakeAccountData())
    await expect(promise).rejects.toThrow()
  })

  test('Should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')
    await sut.add(mockFakeAccountData())
    expect(addSpy).toHaveBeenCalledWith({
      name: 'valid_name',
      email: 'any_email@mail.com',
      password: 'hashed_password'
    })
  })

  test('Should throw if AddAccountRepository throws', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    jest.spyOn(addAccountRepositoryStub, 'add').mockRejectedValueOnce(new Error())
    const promise = sut.add(mockFakeAccountData())
    await expect(promise).rejects.toThrow()
  })

  test('Should return an account on success', async () => {
    const { sut } = makeSut()
    const account = await sut.add(mockFakeAccountData())
    expect(account).toEqual(mockFakeAddAccountResult())
  })

  test('Should return null if LoadAccountByEmailRepository not return null', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(Promise.resolve(mockFakeAddAccountResult()))
    const account = await sut.add(mockFakeAccountData())
    expect(account).toBeNull()
  })

  test('Should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
    await sut.add(mockFakeAccountData())
    expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com')
  })
})
