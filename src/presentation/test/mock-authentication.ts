import { AuthAccount } from '@/domain/models/auth-account'
import { AuthenticationModel } from '@/domain/usecases/authentication'

export class AuthenticationStub {
  async auth (params: AuthenticationModel): Promise<AuthAccount> {
    return {
      name: 'any_name',
      token: 'any_token'
    }
  }
}
