import { AddAccount } from '@/domain/usecases/account/add-account'
import { EmailInUseError, MissingParamError, ServerError } from '@/presentation/errors'
import { EmailValidatorStub } from '@/presentation/test/mock-email-validator'
import { SignUpController } from './signup-controller'
import { mockSignUpRequest } from '@/presentation/test/mock-signup-request'
import { ok, serverError, badRequest, forbidden } from '@/presentation/helpers/http/http-helper'
import { AddAccountStub } from '@/presentation/test/mock-add-account'
import { ValidationStub } from '@/presentation/test/mock-validation'
import { AuthenticationStub } from '@/presentation/test/mock-authentication'
import { mockLoginRequest } from '@/presentation/test/mock-login-request'
import { EmailValidator } from '@/validation/protocols/email-validator'

type SutTypes = {
  sut: SignUpController
  emailValidatorStub: EmailValidator
  addAccountStub: AddAccount
  validationStub: ValidationStub
  authenticationStub: AuthenticationStub
}

const makeSut = (): SutTypes => {
  const emailValidatorStub = new EmailValidatorStub()
  const addAccountStub = new AddAccountStub()
  const validationStub = new ValidationStub()
  const authenticationStub = new AuthenticationStub()
  const sut = new SignUpController(addAccountStub, validationStub, authenticationStub)
  return {
    sut,
    emailValidatorStub,
    addAccountStub,
    validationStub,
    authenticationStub
  }
}

describe('SignUpController', () => {
  test('Should return 500 if AddAccount throws', async () => {
    const { sut, addAccountStub } = makeSut()
    jest.spyOn(addAccountStub, 'add').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => reject(new Error()))
    })
    const httpResponse = await sut.handle(mockSignUpRequest())
    expect(httpResponse).toEqual(serverError(new ServerError()))
  })

  test('Should call AddAccount with correct values', async () => {
    const { sut, addAccountStub } = makeSut()
    const addSpy = jest.spyOn(addAccountStub, 'add')
    await sut.handle(mockSignUpRequest())
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_password'
    })
  })

  test('Should return 403 if AddAccount returns null', async () => {
    const { sut, addAccountStub } = makeSut()
    jest.spyOn(addAccountStub, 'add').mockImplementationOnce(async (): Promise<any> => {
      return await Promise.resolve(null)
    })
    const httpResponse = await sut.handle(mockSignUpRequest())
    expect(httpResponse).toEqual(forbidden(new EmailInUseError()))
  })

  test('Should return 200 if valid data are provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockSignUpRequest())
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

  test('Should call Authentication with correct values', async () => {
    const { sut, authenticationStub } = makeSut()
    const authSpy = jest.spyOn(authenticationStub, 'auth')
    await sut.handle(mockLoginRequest())
    expect(authSpy).toHaveBeenCalledWith({
      email: 'any_email@mail.com',
      password: 'any_password'
    })
  })

  test('Should return 500 if Authentication throws', async () => {
    const { sut, authenticationStub } = makeSut()
    jest.spyOn(authenticationStub, 'auth').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(mockLoginRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
