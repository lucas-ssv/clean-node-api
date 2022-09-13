import { SurveyModel } from '@/domain/models/survey'
import { LoadSurveyById } from '@/domain/usecases/survey/load-survey-by-id'
import { mockFakeSurvey } from './mock-fake-survey'

export class LoadSurveyByIdStub implements LoadSurveyById {
  async loadById (id: string): Promise<SurveyModel> {
    return await Promise.resolve(mockFakeSurvey())
  }
}
