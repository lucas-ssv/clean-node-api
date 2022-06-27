import { Decrypter } from '../protocols/criptography/decrypter'

export class DecrypterStub implements Decrypter {
  async decrypt (value: string): Promise<string> {
    return await Promise.resolve('any_value')
  }
}
