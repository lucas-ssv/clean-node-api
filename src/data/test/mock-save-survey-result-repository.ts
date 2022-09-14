import { mockFakeSurveyResultModel } from './mock-fake-survey-result'
import { SurveyResultModel } from '@/domain/models/survey-result'
import { SaveSurveyResultParams } from '@/domain/usecases/survey-result/save-survey-result'
import { SaveSurveyResultRepository } from '@/data/protocols/db/survey-result/save-survey-result-repository'

export class SaveSurveyResultRepositoryStub implements SaveSurveyResultRepository {
  async save (data: SaveSurveyResultParams): Promise<SurveyResultModel> {
    return await Promise.resolve(mockFakeSurveyResultModel())
  }
}
