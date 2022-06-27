import { DbLoadAccountByToken } from './db-load-account-by-token'
import { DecrypterStub } from '../../test/mock-decrypter'

type SutTypes = {
  sut: DbLoadAccountByToken
  decrypterStub: DecrypterStub
}

const makeSut = (): SutTypes => {
  const decrypterStub = new DecrypterStub()
  const sut = new DbLoadAccountByToken(decrypterStub)
  return {
    sut,
    decrypterStub
  }
}

describe('DbLoadAccountByToken Usecase', () => {
  test('Should call Decrypter with correct value', async () => {
    const { sut, decrypterStub } = makeSut()
    const decryptSpy = jest.spyOn(decrypterStub, 'decrypt')
    await sut.load('any_token')
    expect(decryptSpy).toHaveBeenCalledWith('any_token')
  })
})
