import { LoadSurveysController } from './load-surveys-controller'
import { LoadSurveys } from '../../../../domain/usecases/load-surveys'
import { SurveyModel } from '../../../../domain/models/survey'
import { mockFakeSurveys } from '../../../test/mock-fake-surveys'
import MockDate from 'mockdate'

class LoadSurveysStub implements LoadSurveys {
  async load (): Promise<SurveyModel[]> {
    return await Promise.resolve(mockFakeSurveys())
  }
}

describe('LoadSurveysController', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call LoadSurveysController', async () => {
    const loadSurveysStub = new LoadSurveysStub()
    const loadSpy = jest.spyOn(loadSurveysStub, 'load')
    const sut = new LoadSurveysController(loadSurveysStub)
    await sut.handle({})
    expect(loadSpy).toHaveBeenCalled()
  })
})
