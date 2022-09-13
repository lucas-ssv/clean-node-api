import { SaveSurveyResultController } from './save-survey-result-controller'
import { mockFakeRequest } from '@/presentation/test/mock-fake-request'
import { LoadSurveyByIdStub } from '@/presentation/test/mock-load-survey-by-id'

describe('SaveSurveyResultController', () => {
  test('Should call LoadSurveyById with correct values', async () => {
    const loadSurveyByIdStub = new LoadSurveyByIdStub()
    const loadByIdSpy = jest.spyOn(loadSurveyByIdStub, 'loadById')
    const sut = new SaveSurveyResultController(loadSurveyByIdStub)
    await sut.handle(mockFakeRequest())
    expect(loadByIdSpy).toHaveBeenCalledWith('any_survey_id')
  })
})
