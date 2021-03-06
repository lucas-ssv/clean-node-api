import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { LogMongoRepository } from '@/infra/db/mongodb/log/log-mongo-repository'
import env from '@/main/config/env'
import { Collection } from 'mongodb'

const makeSut = (): LogMongoRepository => new LogMongoRepository()

describe('LogMongoRepository', () => {
  let errorCollection: Collection
  beforeAll(async () => {
    await MongoHelper.connect(env.mongoUrl)
  })

  beforeEach(async () => {
    errorCollection = await MongoHelper.getCollection('errors')
    await errorCollection.deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('Should create an error log on success', async () => {
    const sut = makeSut()
    await sut.logError('any_error')
    const count = await errorCollection.countDocuments()
    expect(count).toBe(1)
  })
})
