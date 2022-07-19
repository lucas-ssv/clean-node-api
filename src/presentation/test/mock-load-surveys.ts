import { SurveyModel } from '@/domain/models/survey'
import { LoadSurveys } from '@/domain/usecases/survey/load-surveys'
import { mockFakeSurveys } from '@/domain/test/mock-fake-surveys'

export class LoadSurveysStub implements LoadSurveys {
  async loadAll (): Promise<SurveyModel[]> {
    return await Promise.resolve(mockFakeSurveys())
  }
}
