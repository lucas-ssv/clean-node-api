import { ValidationStub } from '../../../test/mock-validation'
import { mockAddSurvey } from '../../../test/mock-add-survey'
import { AddSurveyController } from './add-survey-controller'

describe('AddSurveyController', () => {
  test('Should call Validation with correct values', async () => {
    const validationStub = new ValidationStub()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const sut = new AddSurveyController(validationStub)
    const httpRequest = mockAddSurvey()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })
})
