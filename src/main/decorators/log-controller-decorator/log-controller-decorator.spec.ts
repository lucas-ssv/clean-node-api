import { Controller, HttpRequest, HttpResponse } from '../../../presentation/protocols'
import { LogControllerDecorator } from './log-controller-decorator'

class ControllerStub implements Controller {
  async handle (request: HttpRequest): Promise<HttpResponse> {
    const httpResponse = {
      statusCode: 200,
      body: {
        name: 'Lucas'
      }
    }
    return await Promise.resolve(httpResponse)
  }
}

describe('LogControllerDecorator', () => {
  test('Should call controller handle', async () => {
    const controllerStub = new ControllerStub()
    const handleSpy = jest.spyOn(controllerStub, 'handle')
    const sut = new LogControllerDecorator(controllerStub)
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    await sut.handle(httpRequest)
    expect(handleSpy).toBeCalledWith(httpRequest)
  })
})
