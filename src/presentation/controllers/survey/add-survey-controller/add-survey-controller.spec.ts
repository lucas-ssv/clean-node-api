import { ValidationStub } from '../../../test/mock-validation'
import { AddSurveyStub, mockAddSurveyRequest } from '../../../test/mock-add-survey'
import { AddSurveyController } from './add-survey-controller'
import { badRequest } from '../../../helpers/http/http-helper'

type SutTypes = {
  sut: AddSurveyController
  validationStub: ValidationStub
  addSurveyStub: AddSurveyStub
}

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub()
  const addSurveyStub = new AddSurveyStub()
  const sut = new AddSurveyController(validationStub, addSurveyStub)
  return {
    sut,
    validationStub,
    addSurveyStub
  }
}

describe('AddSurveyController', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = mockAddSurveyRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return 400 if validation fails', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error())
    const httpResponse = await sut.handle(mockAddSurveyRequest())
    expect(httpResponse).toEqual(badRequest(new Error()))
  })

  test('Should call AddSurvey with correct values', async () => {
    const { sut, addSurveyStub } = makeSut()
    const addSurveySpy = jest.spyOn(addSurveyStub, 'add')
    const httpRequest = mockAddSurveyRequest()
    await sut.handle(httpRequest)
    expect(addSurveySpy).toHaveBeenCalledWith(httpRequest.body)
  })
})
