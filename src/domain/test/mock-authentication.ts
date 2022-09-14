import { AuthenticationParams } from '@/domain/usecases/account/authentication'

export const mockAuthentication = (): AuthenticationParams => ({
  email: 'any_email@mail.com',
  password: 'any_password'
})
