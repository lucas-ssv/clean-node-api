import { AuthAccount } from '../../domain/models/auth-account'

export class AuthenticationStub {
  async auth (email: string, password: string): Promise<AuthAccount> {
    return await Promise.resolve(null)
  }
}
