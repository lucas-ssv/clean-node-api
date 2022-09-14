import { AuthenticationParams } from '@/domain/usecases/account/authentication'

export const mockFakeAuthenticationParams = (): AuthenticationParams => ({
  email: 'any_email@mail.com',
  password: 'any_password'
})
