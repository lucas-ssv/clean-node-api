import { serverError } from '@/presentation/helpers/http/http-helper'
import { HttpResponse } from '@/presentation/protocols'

export const mockFakeServerError = (): HttpResponse => {
  const fakeError = new Error()
  fakeError.stack = 'any_stack'
  return serverError(fakeError)
}
