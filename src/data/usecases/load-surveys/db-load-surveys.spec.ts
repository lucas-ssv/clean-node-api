import { DbLoadSurveys } from './db-load-surveys'
import { LoadSurveysRepositoryStub } from '../../test/mock-load-surveys-repository'
import { LoadSurveysRepository } from '../../protocols/db/survey/load-surveys-repository'
import { mockFakeSurveys } from '../../../domain/test/mock-fake-surveys'

type SutTypes = {
  sut: DbLoadSurveys
  loadSurveysRepositoryStub: LoadSurveysRepository
}

const makeSut = (): SutTypes => {
  const loadSurveysRepositoryStub = new LoadSurveysRepositoryStub()
  const sut = new DbLoadSurveys(loadSurveysRepositoryStub)
  return {
    sut,
    loadSurveysRepositoryStub
  }
}

describe('DbLoadSurveys Usecase', () => {
  test('Should call LoadSurveysRepository', async () => {
    const { sut, loadSurveysRepositoryStub } = makeSut()
    const loadAllSpy = jest.spyOn(loadSurveysRepositoryStub, 'loadAll')
    await sut.loadAll()
    expect(loadAllSpy).toHaveBeenCalled()
  })

  test('Should return a list of Surveys on success', async () => {
    const { sut } = makeSut()
    const surveys = await sut.loadAll()
    expect(surveys).toEqual(mockFakeSurveys())
  })
})
