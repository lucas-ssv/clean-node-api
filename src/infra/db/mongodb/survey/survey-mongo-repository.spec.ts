import { MongoHelper } from '../helpers/mongo-helper'
import env from '../../../../main/config/env'
import { SurveyMongoRepository } from './survey-mongo-repository'
import { Collection } from 'mongodb'

let surveyCollection: Collection

describe('SurveyMongoRepository', () => {
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

  test('Should return a survey on add success', async () => {
    const sut = new SurveyMongoRepository()
    await sut.add({
      question: 'any_question',
      answers: [{
        image: 'any_image',
        answer: 'any_answer'
      }, {
        answer: 'other_answer'
      }]
    })
    const survey = await surveyCollection.findOne({ question: 'any_question' })
    expect(survey).toBeTruthy()
  })
})
