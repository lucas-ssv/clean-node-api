import { HttpRequest } from '../protocols'

export const makeFakeHeadersRequest = (): HttpRequest => ({
  headers: {
    'x-access-token': 'any_token'
  }
})
