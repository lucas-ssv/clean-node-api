import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import env from '@/main/config/env'
import { app } from '@/main/config/app'
import request from 'supertest'
import { Collection } from 'mongodb'
import jwt from 'jsonwebtoken'

let surveyCollection: Collection
let accountCollection: Collection

const makeAccessToken = async (role?: string): Promise<string> => {
  const result = await accountCollection.insertOne({
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password',
    role
  })
  const account = await accountCollection.findOne({ _id: result.insertedId })
  const accessToken = jwt.sign({ id: account?._id.toHexString() }, env.jwtSecret)
  await accountCollection.updateOne({
    _id: account?._id
  }, {
    $set: {
      accessToken
    }
  })
  return accessToken
}

describe('Survey Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(env.mongoUrl)
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })
  describe('PUT /surveys/:surveyId/results', () => {
    test('Should return 403 on save survey result without accessToken', async () => {
      await request(app)
        .put('/api/surveys/any_id/results')
        .send({
          answer: 'any_answer'
        }).expect(403)
    })

    test('Should return 200 on save survey result with accessToken', async () => {
      const accessToken = await makeAccessToken()
      const survey = await surveyCollection.insertOne({
        question: 'Question',
        answers: [{
          answer: 'Answer 1',
          image: 'http://image-name.com'
        }, {
          answer: 'Answer 2'
        }],
        date: new Date()
      })
      await request(app)
        .put(`/api/surveys/${survey.insertedId.toHexString()}/results`)
        .set('x-access-token', accessToken)
        .send({
          answer: 'Answer 1'
        }).expect(200)
    })
  })
})
