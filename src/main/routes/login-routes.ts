import { Router } from 'express'
import { adaptRoute } from '../adapters/express-adapter/express-route-adapter'
import { makeLoginController } from '../factories/controllers/login-factory/login-controller-factory'
import { makeSignUpController } from '../factories/controllers/signup-factory/signup-controller-factory'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignUpController()))
  router.post('/login', adaptRoute(makeLoginController()))
}
