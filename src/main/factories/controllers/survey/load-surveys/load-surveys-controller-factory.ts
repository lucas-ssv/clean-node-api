import { LoadSurveysController } from '../../../../../presentation/controllers/survey/load-surveys-controller/load-surveys-controller'
import { Controller } from '../../../../../presentation/protocols'
import { makeDbLoadSurveys } from '../../../usecases/survey/load-surveys/db-load-surveys-factory'

export const makeLoadSurveysController = (): Controller => {
  const loadSurveysController = new LoadSurveysController(makeDbLoadSurveys())
  return loadSurveysController
}
