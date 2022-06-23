import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import env from '../config/env'
import request from 'supertest'
import { Collection } from 'mongodb'
import { app } from '../config/app'

describe('Survey Routes', () => {
  let surveyCollection: Collection

  beforeAll(async () => {
    await MongoHelper.connect(env.mongoUrl)
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  describe('POST /surveys', () => {
    test('Should return 200 on add survey success', async () => {
      await request(app)
        .post('/api/surveys')
        .send({
          question: 'Question',
          answers: [{
            answer: 'Answer 1',
            image: 'http://image-name.com'
          }, {
            answer: 'Answer 2'
          }]
        }).expect(204)
    })
  })
})
