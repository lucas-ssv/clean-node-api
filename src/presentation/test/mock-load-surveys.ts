import { SurveyModel } from '../../domain/models/survey'
import { LoadSurveys } from '../../domain/usecases/load-surveys'
import { mockFakeSurveys } from './mock-fake-surveys'

export class LoadSurveysStub implements LoadSurveys {
  async load (): Promise<SurveyModel[]> {
    return await Promise.resolve(mockFakeSurveys())
  }
}
