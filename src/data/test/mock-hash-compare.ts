import { HashCompare } from '@/data/protocols/criptography/hash-compare'

export class HashCompareStub implements HashCompare {
  async compare (value: string, hash: string): Promise<boolean> {
    return await Promise.resolve(true)
  }
}
