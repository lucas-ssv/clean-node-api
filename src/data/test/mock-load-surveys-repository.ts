import { SurveyModel } from '@/domain/models/survey'
import { mockFakeSurveys } from '@/domain/test/mock-fake-surveys'
import { LoadSurveysRepository } from '@/data/protocols/db/survey/load-surveys-repository'

export class LoadSurveysRepositoryStub implements LoadSurveysRepository {
  async loadAll (): Promise<SurveyModel[]> {
    return mockFakeSurveys()
  }
}
