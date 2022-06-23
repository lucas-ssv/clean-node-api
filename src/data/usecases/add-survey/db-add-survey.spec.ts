import { DbAddSurvey } from './db-add-survey'
import { AddSurveyRepositoryStub, mockAddSurvey } from '../../test/mock-add-survey-repository'

type SutTypes = {
  sut: DbAddSurvey
  addSurveyRepositoryStub: AddSurveyRepositoryStub
}

const makeSut = (): SutTypes => {
  const addSurveyRepositoryStub = new AddSurveyRepositoryStub()
  const sut = new DbAddSurvey(addSurveyRepositoryStub)
  return {
    sut,
    addSurveyRepositoryStub
  }
}

describe('DbAddSurvey Usecase', () => {
  test('Should call AddSurveyRepository with correct values', async () => {
    const { sut, addSurveyRepositoryStub } = makeSut()
    const addSurveySpy = jest.spyOn(addSurveyRepositoryStub, 'add')
    const surveyData = mockAddSurvey()
    await sut.add(surveyData)
    expect(addSurveySpy).toHaveBeenCalledWith(surveyData)
  })

  test('Should throw if AddSurveyRepository throws', async () => {
    const { sut, addSurveyRepositoryStub } = makeSut()
    jest.spyOn(addSurveyRepositoryStub, 'add').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.add(mockAddSurvey())
    await expect(promise).rejects.toThrow()
  })
})
