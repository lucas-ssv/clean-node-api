import { DbLoadAccountByToken } from './db-load-account-by-token'
import { DecrypterStub } from '../../test/mock-decrypter'
import { AccountModel } from '../../../domain/models/account'
import { mockFakeAddAccountResult } from '../../test/mock-fake-add-account-result'
import { LoadAccountByTokenRepository } from '../../protocols/db/account/load-account-by-token-repository'

type SutTypes = {
  sut: DbLoadAccountByToken
  decrypterStub: DecrypterStub
  loadAccountByTokenRepositoryStub: LoadAccountByTokenRepositoryStub
}

class LoadAccountByTokenRepositoryStub implements LoadAccountByTokenRepository {
  async loadByToken (token: string, role?: string): Promise<AccountModel> {
    return await Promise.resolve(mockFakeAddAccountResult())
  }
}

const makeSut = (): SutTypes => {
  const decrypterStub = new DecrypterStub()
  const loadAccountByTokenRepositoryStub = new LoadAccountByTokenRepositoryStub()
  const sut = new DbLoadAccountByToken(decrypterStub, loadAccountByTokenRepositoryStub)
  return {
    sut,
    decrypterStub,
    loadAccountByTokenRepositoryStub
  }
}

describe('DbLoadAccountByToken Usecase', () => {
  test('Should call Decrypter with correct value', async () => {
    const { sut, decrypterStub } = makeSut()
    const decryptSpy = jest.spyOn(decrypterStub, 'decrypt')
    await sut.load('any_token', 'any_role')
    expect(decryptSpy).toHaveBeenCalledWith('any_token')
  })

  test('Should return null if Decrypter returns null', async () => {
    const { sut, decrypterStub } = makeSut()
    jest.spyOn(decrypterStub, 'decrypt').mockReturnValueOnce(new Promise(resolve => resolve(null)) as any)
    const account = await sut.load('any_token', 'any_role')
    expect(account).toBeNull()
  })

  test('Should call LoadAccountByTokenRepository with correct values', async () => {
    const { sut, loadAccountByTokenRepositoryStub } = makeSut()
    const loadByTokenSpy = jest.spyOn(loadAccountByTokenRepositoryStub, 'loadByToken')
    await sut.load('any_token', 'any_role')
    expect(loadByTokenSpy).toHaveBeenCalledWith('any_token', 'any_role')
  })

  test('Should return null if LoadAccountByTokenRepository returns null', async () => {
    const { sut, loadAccountByTokenRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByTokenRepositoryStub, 'loadByToken').mockReturnValueOnce(new Promise(resolve => resolve(null)) as any)
    const account = await sut.load('any_token', 'any_role')
    expect(account).toBeNull()
  })
})
