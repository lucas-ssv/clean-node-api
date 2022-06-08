import { Validation } from '../../../../presentation/helpers/validation/protocols/validation'
import { EmailValidation } from '../../../../presentation/helpers/validation/validators/email-validation/email-validation'
import { RequiredFieldValidation } from '../../../../presentation/helpers/validation/validators/required-field-validation/required-field-validation'
import { ValidationComposite } from '../../../../presentation/helpers/validation/validators/validation-composite/validation-composite'
import { EmailValidatorStub } from '../../../../presentation/test/mock-email-validator'
import { makeSignUpValidation } from './login-validation'

jest.mock('../../../../presentation/helpers/validation/validators/validation-composite/validation-composite')

describe('LoginValidationFactory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeSignUpValidation()
    const validations: Validation[] = []
    for (const field of ['email', 'password']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new EmailValidation('email', new EmailValidatorStub()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
