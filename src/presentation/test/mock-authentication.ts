import { AuthAccount } from '@/domain/models/auth-account'
import { AuthenticationParams } from '@/domain/usecases/account/authentication'

export class AuthenticationStub {
  async auth (params: AuthenticationParams): Promise<AuthAccount> {
    return {
      name: 'any_name',
      token: 'any_token'
    }
  }
}
