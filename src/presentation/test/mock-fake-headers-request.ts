import { HttpRequest } from '../protocols'

export const mockFakeHeadersRequest = (): HttpRequest => ({
  headers: {
    'x-access-token': 'any_token'
  }
})
