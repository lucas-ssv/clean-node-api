import { HttpRequest } from '@/presentation/protocols'

export const mockHeadersRequest = (): HttpRequest => ({
  headers: {
    'x-access-token': 'any_token'
  }
})
