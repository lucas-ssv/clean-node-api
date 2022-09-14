import { SurveyModel } from '@/domain/models/survey'
import { mockSurveys } from '@/domain/test'
import { AddSurvey, AddSurveyParams } from '@/domain/usecases/survey/add-survey'
import { LoadSurveyById } from '@/domain/usecases/survey/load-survey-by-id'
import { LoadSurveys } from '@/domain/usecases/survey/load-surveys'
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
  async add (data: AddSurveyParams): Promise<void> {
    return await Promise.resolve()
  }
}

export class LoadSurveysStub implements LoadSurveys {
  async loadAll (): Promise<SurveyModel[]> {
    return await Promise.resolve(mockSurveys())
  }
}

export class LoadSurveyByIdStub implements LoadSurveyById {
  async loadById (id: string): Promise<SurveyModel> {
    return await Promise.resolve(mockSurveys()[0])
  }
}
