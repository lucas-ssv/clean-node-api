import { LoadSurveyByIdRepository } from '@/data/protocols/db/survey/load-survey-by-id-repository'
import { SurveyModel } from '@/domain/models/survey'
import { mockFakeSurveys } from '@/domain/test/mock-fake-surveys'
import { DbLoadSurveyById } from './db-load-survey-by-id'
import MockDate from 'mockdate'

class LoadSurveyByIdRepositoryStub implements LoadSurveyByIdRepository {
  async loadById (id: string): Promise<SurveyModel> {
    return await Promise.resolve(mockFakeSurveys()[0])
  }
}

describe('DbLoadSurveyById Usecase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call DbLoadSurveyById', async () => {
    const loadSurveyByIdRepositoryStub = new LoadSurveyByIdRepositoryStub()
    const loadSpy = jest.spyOn(loadSurveyByIdRepositoryStub, 'loadById')
    const sut = new DbLoadSurveyById(loadSurveyByIdRepositoryStub)
    await sut.loadById('any_id')
    expect(loadSpy).toHaveBeenCalledWith('any_id')
  })
})
