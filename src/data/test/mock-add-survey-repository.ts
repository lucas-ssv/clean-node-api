import { AddSurveyModel } from '../../domain/usecases/add-survey'
import { AddSurveyRepository } from '../protocols/db/survey/add-survey-repository'

export const mockAddSurvey = (): AddSurveyModel => ({
  question: 'any_question',
  answers: [{
    image: 'any_image',
    answer: 'any_answer'
  }]
})

export class AddSurveyRepositoryStub implements AddSurveyRepository {
  async add (surveyData: AddSurveyModel): Promise<void> {
    return await Promise.resolve()
  }
}
