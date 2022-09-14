import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'
import { mockServerError } from '@/presentation/test/mock-server-error'
import { mockSignUpRequest } from '@/presentation/test/mock-signup-request'
import { LogControllerDecorator } from '@/main/decorators/log-controller-decorator/log-controller-decorator'
import { LogErrorRepositoryStub } from '@/data/test/mock-db-log'

class ControllerStub implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const httpResponse = {
      statusCode: 200,
      body: {
        name: 'Lucas'
      }
    }
    return await Promise.resolve(httpResponse)
  }
}

type SutTypes = {
  sut: LogControllerDecorator
  controllerStub: ControllerStub
  logErrorRepositoryStub: LogErrorRepositoryStub
}

const makeSut = (): SutTypes => {
  const controllerStub = new ControllerStub()
  const logErrorRepositoryStub = new LogErrorRepositoryStub()
  const sut = new LogControllerDecorator(controllerStub, logErrorRepositoryStub)
  return {
    sut,
    controllerStub,
    logErrorRepositoryStub
  }
}

describe('LogControllerDecorator', () => {
  test('Should call controller handle', async () => {
    const { sut, controllerStub } = makeSut()
    const handleSpy = jest.spyOn(controllerStub, 'handle')
    await sut.handle(mockSignUpRequest())
    expect(handleSpy).toBeCalledWith(mockSignUpRequest())
  })

  test('Should return the same result of the controller', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockSignUpRequest())
    expect(httpResponse).toEqual({
      statusCode: 200,
      body: {
        name: 'Lucas'
      }
    })
  })

  test('Should call LogErrorRepository with correct error if controller returns a server error', async () => {
    const { sut, controllerStub, logErrorRepositoryStub } = makeSut()
    const logSpy = jest.spyOn(logErrorRepositoryStub, 'logError')
    jest.spyOn(controllerStub, 'handle').mockReturnValueOnce(Promise.resolve(mockServerError()))
    await sut.handle(mockSignUpRequest())
    expect(logSpy).toHaveBeenCalledWith('any_stack')
  })
})
