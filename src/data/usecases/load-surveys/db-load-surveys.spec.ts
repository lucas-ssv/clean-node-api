import { SurveyModel } from '../../../domain/models/survey'
import { LoadSurveysRepository } from '../../protocols/db/survey/load-surveys-repository'
import { mockFakeSurveys } from '../../../domain/test/mock-fake-surveys'
import { DbLoadSurveys } from './db-load-surveys'

class LoadSurveysRepositoryStub implements LoadSurveysRepository {
  async loadAll (): Promise<SurveyModel[]> {
    return mockFakeSurveys()
  }
}

describe('DbLoadSurveys Usecase', () => {
  test('Should call LoadSurveysRepository', async () => {
    const loadSurveysRepositoryStub = new LoadSurveysRepositoryStub()
    const loadAllSpy = jest.spyOn(loadSurveysRepositoryStub, 'loadAll')
    const sut = new DbLoadSurveys(loadSurveysRepositoryStub)
    await sut.loadAll()
    expect(loadAllSpy).toHaveBeenCalled()
  })
})
