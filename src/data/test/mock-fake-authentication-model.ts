import { AuthenticationModel } from '../../domain/usecases/authentication'

export const mockFakeAuthenticationModel = (): AuthenticationModel => ({
  email: 'any_email@mail.com',
  password: 'any_password'
})
