import { AuthenticationModel } from '@/domain/usecases/account/authentication'

export const mockFakeAuthenticationModel = (): AuthenticationModel => ({
  email: 'any_email@mail.com',
  password: 'any_password'
})
