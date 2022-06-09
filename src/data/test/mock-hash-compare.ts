import { HashCompare } from '../protocols/criptography/hash-comparer'

export class HashCompareStub implements HashCompare {
  async compare (value: string, hash: string): Promise<boolean> {
    return await Promise.resolve(true)
  }
}
