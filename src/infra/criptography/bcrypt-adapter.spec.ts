import { BcryptAdapter } from './bcrypt-adapter'
import bcrypt from 'bcrypt'

jest.mock('bcrypt', () => ({
  hash: async (): Promise<string> => {
    return await Promise.resolve('hash')
  }
}))

const makeSut = (salt = 12): BcryptAdapter => new BcryptAdapter(salt)

describe('BcryptAdapter', () => {
  test('Should call bcrypt with correct values', async () => {
    const salt = 12
    const sut = makeSut(salt)
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })

  test('Should return a hash on success', async () => {
    const sut = makeSut()
    const hash = await sut.encrypt('any_value')
    expect(hash).toBe('hash')
  })

  test('Should throw if bcrypt throws', async () => {
    const sut = makeSut()
    jest.spyOn(bcrypt, 'hash').mockImplementationOnce((pass, salt, cb) => cb(null, ''))
    const promise = sut.encrypt('any_value')
    await expect(promise).rejects.toThrow()
  })
})
