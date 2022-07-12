import { HttpRequest } from '@/presentation/protocols'

export const mockLoginRequest = (): HttpRequest => ({
  body: {
    email: 'any_email@mail.com',
    password: 'any_password'
  }
})
