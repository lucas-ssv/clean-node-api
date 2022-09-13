import { SaveSurveyResultController } from './save-survey-result-controller'
import { mockFakeRequest } from '@/presentation/test/mock-fake-request'
import { LoadSurveyByIdStub } from '@/presentation/test/mock-load-survey-by-id'
import { LoadSurveyById } from '@/domain/usecases/survey/load-survey-by-id'

type SutTypes = {
  sut: SaveSurveyResultController
  loadSurveyByIdStub: LoadSurveyById
}

const makeSut = (): SutTypes => {
  const loadSurveyByIdStub = new LoadSurveyByIdStub()
  const sut = new SaveSurveyResultController(loadSurveyByIdStub)
  return {
    sut,
    loadSurveyByIdStub
  }
}

describe('SaveSurveyResultController', () => {
  test('Should call LoadSurveyById with correct values', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadSurveyByIdStub, 'loadById')
    await sut.handle(mockFakeRequest())
    expect(loadByIdSpy).toHaveBeenCalledWith('any_survey_id')
  })
})
