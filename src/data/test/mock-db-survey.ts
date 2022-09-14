import { AddSurveyParams } from '@/domain/usecases/survey/add-survey'
import { AddSurveyRepository } from '@/data/protocols/db/survey/add-survey-repository'
import { SurveyModel } from '@/domain/models/survey'
import { mockSurveys } from '@/domain/test'
import { LoadSurveyByIdRepository } from '@/data/protocols/db/survey/load-survey-by-id-repository'
import { LoadSurveysRepository } from '@/data/protocols/db/survey/load-surveys-repository'

export const mockAddSurvey = (): AddSurveyParams => ({
  question: 'any_question',
  answers: [{
    image: 'any_image',
    answer: 'any_answer'
  }],
  date: new Date()
})

export class AddSurveyRepositoryStub implements AddSurveyRepository {
  async add (surveyData: AddSurveyParams): Promise<void> {
    return await Promise.resolve()
  }
}

export class LoadSurveyByIdRepositoryStub implements LoadSurveyByIdRepository {
  async loadById (id: string): Promise<SurveyModel> {
    return await Promise.resolve(mockSurveys()[0])
  }
}

export class LoadSurveysRepositoryStub implements LoadSurveysRepository {
  async loadAll (): Promise<SurveyModel[]> {
    return mockSurveys()
  }
}
