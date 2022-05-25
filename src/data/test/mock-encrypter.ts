import { Encrypter } from '../protocols/encrypter'

export class EncrypterStub implements Encrypter {
  async encrypt (value: string): Promise<string> {
    return await Promise.resolve('hashed_password')
  }
}
