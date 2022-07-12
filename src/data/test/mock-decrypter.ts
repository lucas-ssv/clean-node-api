import { Decrypter } from '@/data/protocols/criptography/decrypter'

export class DecrypterStub implements Decrypter {
  async decrypt (value: string): Promise<string> {
    return await Promise.resolve('any_token')
  }
}
