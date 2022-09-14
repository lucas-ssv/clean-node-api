import { AuthAccount } from '@/domain/models/auth-account'
import { Authentication, AuthenticationParams } from '@/domain/usecases/account/authentication'

export class AuthenticationStub implements Authentication {
  async auth (params: AuthenticationParams): Promise<AuthAccount> {
    return {
      name: 'any_name',
      token: 'any_token'
    }
  }
}
