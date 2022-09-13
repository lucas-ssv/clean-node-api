import { HttpRequest } from '../protocols'

export const mockFakeRequest = (): HttpRequest => ({
  params: {
    surveyId: 'any_survey_id'
  }
})
