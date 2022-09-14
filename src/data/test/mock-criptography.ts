import { Hasher } from '@/data/protocols/criptography/hasher'
import { Decrypter } from '@/data/protocols/criptography/decrypter'
import { HashCompare } from '@/data/protocols/criptography/hash-compare'
import { Encrypter } from '@/data/protocols/criptography/encrypter'

export class HasherStub implements Hasher {
  async hash (value: string): Promise<string> {
    return await Promise.resolve('hashed_password')
  }
}

export class DecrypterStub implements Decrypter {
  async decrypt (value: string): Promise<string> {
    return await Promise.resolve('any_token')
  }
}

export class HashCompareStub implements HashCompare {
  async compare (value: string, hash: string): Promise<boolean> {
    return await Promise.resolve(true)
  }
}

export class EncrypterStub implements Encrypter {
  async encrypt (id: string): Promise<string> {
    return await Promise.resolve('any_token')
  }
}
