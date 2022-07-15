import { SurveyModel } from '@/domain/models/survey'
import { mockFakeSurveys } from '@/domain/test/mock-fake-surveys'
import { LoadSurveyByIdRepository } from '@/data/protocols/db/survey/load-survey-by-id-repository'

export class LoadSurveyByIdRepositoryStub implements LoadSurveyByIdRepository {
  async loadById (id: string): Promise<SurveyModel> {
    return await Promise.resolve(mockFakeSurveys()[0])
  }
}
