import { AddSurvey, AddSurveyModel } from '@/domain/usecases/survey/add-survey'
import { HttpRequest } from '@/presentation/protocols'

export const mockAddSurveyRequest = (): HttpRequest => ({
  body: {
    question: 'any_question',
    answers: [{
      image: 'any_image',
      answer: 'any_answer'
    }],
    date: new Date()
  }
})

export class AddSurveyStub implements AddSurvey {
  async add (data: AddSurveyModel): Promise<void> {
    return await Promise.resolve()
  }
}
