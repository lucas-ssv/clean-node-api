import { LoadSurveysController } from './load-surveys-controller'
import { LoadSurveysStub } from '@/presentation/test/mock-load-surveys'
import { LoadSurveys } from '@/domain/usecases/load-surveys'
import { mockFakeSurveys } from '@/domain/test/mock-fake-surveys'
import { noContent, ok, serverError } from '@/presentation/helpers/http/http-helper'
import MockDate from 'mockdate'

type SutTypes = {
  sut: LoadSurveysController
  loadSurveysStub: LoadSurveys
}

const makeSut = (): SutTypes => {
  const loadSurveysStub = new LoadSurveysStub()
  const sut = new LoadSurveysController(loadSurveysStub)
  return {
    sut,
    loadSurveysStub
  }
}

describe('LoadSurveysController', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call LoadSurveysController', async () => {
    const { sut, loadSurveysStub } = makeSut()
    const loadSpy = jest.spyOn(loadSurveysStub, 'loadAll')
    await sut.handle({})
    expect(loadSpy).toHaveBeenCalled()
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(ok(mockFakeSurveys()))
  })

  test('Should return 204 if LoadSurveys returns empty', async () => {
    const { sut, loadSurveysStub } = makeSut()
    jest.spyOn(loadSurveysStub, 'loadAll').mockReturnValueOnce(await Promise.resolve([]) as any)
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(noContent())
  })

  test('Should return 500 if LoadSurveysController throws', async () => {
    const { sut, loadSurveysStub } = makeSut()
    jest.spyOn(loadSurveysStub, 'loadAll').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
