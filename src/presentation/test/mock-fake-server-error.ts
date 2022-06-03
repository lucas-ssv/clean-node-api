import { serverError } from '../helpers/http-helper'
import { HttpResponse } from '../protocols'

export const mockFakeServerError = (): HttpResponse => {
  const fakeError = new Error()
  fakeError.stack = 'any_stack'
  return serverError(fakeError)
}
