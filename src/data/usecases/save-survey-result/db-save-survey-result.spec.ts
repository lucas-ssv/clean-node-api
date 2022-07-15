import { DbSaveSurveyResult } from './db-save-survey-result'
import { SaveSurveyResultRepositoryStub } from '@/data/test/mock-save-survey-result-repository'
import { mockFakeSaveSurveyResultModel } from '@/data/test/mock-fake-survey-result'
import MockDate from 'mockdate'

describe('DbSaveSurveyResult Usecase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call DbSaveSurveyResult with correct values', async () => {
    const saveSurveyResultRepositoryStub = new SaveSurveyResultRepositoryStub()
    const saveSpy = jest.spyOn(saveSurveyResultRepositoryStub, 'save')
    const sut = new DbSaveSurveyResult(saveSurveyResultRepositoryStub)
    const surveyResultData = mockFakeSaveSurveyResultModel()
    await sut.save(surveyResultData)
    expect(saveSpy).toHaveBeenCalledWith(surveyResultData)
  })
})
