import { AccessDeniedError } from '../../errors'
import { forbidden } from '../../helpers/http/http-helper'
import { AuthMiddleware } from './auth-middleware'
import { LoadAccountByTokenStub } from '../../test/mock-load-account-by-token'
import { makeFakeHeadersRequest } from '../../test/mock-fake-headers-request'

type SutTypes = {
  sut: AuthMiddleware
  loadAccountByTokenStub: LoadAccountByTokenStub
}

const makeSut = (): SutTypes => {
  const loadAccountByTokenStub = new LoadAccountByTokenStub()
  const sut = new AuthMiddleware(loadAccountByTokenStub)
  return {
    sut,
    loadAccountByTokenStub
  }
}

describe('AuthMiddleware', () => {
  test('Should return 403 if no x-access-token exists in headers', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })

  test('Should call LoadAccountByToken with correct access token', async () => {
    const { sut, loadAccountByTokenStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByTokenStub, 'load')
    await sut.handle(makeFakeHeadersRequest())
    expect(loadSpy).toHaveBeenCalledWith('any_token')
  })
})
