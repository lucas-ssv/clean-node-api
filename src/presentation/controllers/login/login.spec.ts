import { Authentication } from '../../../domain/usecases/authentication'
import { MissingParamError } from '../../errors'
import { badRequest, ok, serverError, unauthorized } from '../../helpers/http/http-helper'
import { AuthenticationStub } from '../../test/mock-authentication'
import { mockLoginRequest } from '../../test/mock-login-request'
import { mockSignUpRequest } from '../../test/mock-signup-request'
import { ValidationStub } from '../../test/mock-validation'
import { LoginController } from './login'

type SutTypes = {
  sut: LoginController
  authenticationStub: Authentication
  validationStub: ValidationStub
}

const makeSut = (): SutTypes => {
  const authenticationStub = new AuthenticationStub()
  const validationStub = new ValidationStub()
  const sut = new LoginController(authenticationStub, validationStub)
  return {
    sut,
    authenticationStub,
    validationStub
  }
}

describe('LoginController', () => {
  test('Should call Authentication with correct values', async () => {
    const { sut, authenticationStub } = makeSut()
    const authSpy = jest.spyOn(authenticationStub, 'auth')
    await sut.handle(mockLoginRequest())
    expect(authSpy).toHaveBeenCalledWith('any_email@mail.com', 'any_password')
  })

  test('Should return 401 if invalid credentials are provided', async () => {
    const { sut, authenticationStub } = makeSut()
    jest.spyOn(authenticationStub, 'auth').mockReturnValueOnce(Promise.resolve(null))
    const httpResponse = await sut.handle(mockLoginRequest())
    expect(httpResponse).toEqual(unauthorized())
  })

  test('Should return 500 if Authentication throws', async () => {
    const { sut, authenticationStub } = makeSut()
    jest.spyOn(authenticationStub, 'auth').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(mockLoginRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 if valid credentials are provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockLoginRequest())
    expect(httpResponse).toEqual(ok({ name: 'any_name', token: 'any_token' }))
  })

  test('Should call Validation with correct value', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = mockSignUpRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return 400 if Validation fails', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))
    const httpResponse = await sut.handle(mockSignUpRequest())
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  })
})
