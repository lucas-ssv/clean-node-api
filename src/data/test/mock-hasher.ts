import { Hasher } from '../protocols/criptography/hasher'

export class HasherStub implements Hasher {
  async hash (value: string): Promise<string> {
    return await Promise.resolve('hashed_password')
  }
}
