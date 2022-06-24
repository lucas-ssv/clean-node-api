import { AccessDeniedError } from '../../errors'
import { forbidden, ok } from '../../helpers/http/http-helper'
import { AuthMiddleware } from './auth-middleware'
import { LoadAccountByTokenStub } from '../../test/mock-load-account-by-token'
import { mockFakeHeadersRequest } from '../../test/mock-fake-headers-request'

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
    await sut.handle(mockFakeHeadersRequest())
    expect(loadSpy).toHaveBeenCalledWith('any_token')
  })

  test('Should return 403 if LoadAccountByToken returns null', async () => {
    const { sut, loadAccountByTokenStub } = makeSut()
    jest.spyOn(loadAccountByTokenStub, 'load').mockReturnValueOnce(new Promise(resolve => resolve(null)) as any)
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })

  test('Should return 200 if LoadAccountByToken returns an account', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockFakeHeadersRequest())
    expect(httpResponse).toEqual(ok({ accountId: 'valid_id' }))
  })
})
