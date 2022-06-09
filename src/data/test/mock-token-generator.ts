import { TokenGenerator } from '../protocols/criptography/token-generator'

export class TokenGeneratorStub implements TokenGenerator {
  async generate (id: string): Promise<string> {
    return await Promise.resolve('any_token')
  }
}
