import { DbAddSurvey } from './db-add-survey'
import { AddSurveyRepositoryStub, mockAddSurvey } from '../../test/mock-add-survey-repository'

describe('DbAddSurvey Usecase', () => {
  test('Should call AddSurveyRepository with correct values', async () => {
    const addSurveyRepositoryStub = new AddSurveyRepositoryStub()
    const addSurveySpy = jest.spyOn(addSurveyRepositoryStub, 'add')
    const sut = new DbAddSurvey(addSurveyRepositoryStub)
    const surveyData = mockAddSurvey()
    await sut.add(surveyData)
    expect(addSurveySpy).toHaveBeenCalledWith(surveyData)
  })
})
