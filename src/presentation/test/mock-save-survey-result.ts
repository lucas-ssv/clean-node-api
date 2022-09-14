import { SurveyResultModel } from '@/domain/models/survey-result'
import { SaveSurveyResult, SaveSurveyResultParams } from '@/domain/usecases/survey-result/save-survey-result'

export class SaveSurveyResultStub implements SaveSurveyResult {
  async save (data: SaveSurveyResultParams): Promise<SurveyResultModel> {
    return {
      id: 'any_id',
      surveyId: 'any_survey_id',
      accountId: 'any_account_id',
      date: new Date(),
      answer: 'any_answer'
    }
  }
}
