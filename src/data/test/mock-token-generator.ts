import { Encrypter } from '@/data/protocols/criptography/encrypter'

export class EncrypterStub implements Encrypter {
  async encrypt (id: string): Promise<string> {
    return await Promise.resolve('any_token')
  }
}
