import { Validation } from '../../../../presentation/protocols/validation'
import { EmailValidation, RequiredFieldValidation, ValidationComposite } from '../../../../presentation/helpers/validation'
import { EmailValidatorStub } from '../../../../presentation/test/mock-email-validator'
import { makeLoginValidation } from './login-validation-factory'

jest.mock('../../../../presentation/helpers/validation/validators/validation-composite/validation-composite')

describe('LoginValidationFactory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeLoginValidation()
    const validations: Validation[] = []
    for (const field of ['email', 'password']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new EmailValidation('email', new EmailValidatorStub()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})