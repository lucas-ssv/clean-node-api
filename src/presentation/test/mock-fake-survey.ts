import { SurveyModel } from '@/domain/models/survey'

export const mockFakeSurvey = (): SurveyModel => ({
  id: 'any_id',
  question: 'any_question',
  answers: [{
    image: 'any_image',
    answer: 'any_answer'
  }],
  date: new Date('2022-1-1')
})
