import { Validation } from '../../../../presentation/helpers/validation/protocols/validation'
import { RequiredFieldValidation } from '../../../../presentation/helpers/validation/validators/required-field-validation/required-field-validation'
import { ValidationComposite } from '../../../../presentation/helpers/validation/validators/validation-composite/validation-composite'
import { makeSignUpValidation } from './signup-validation'

jest.mock('../../../../presentation/helpers/validation/validators/validation-composite/validation-composite')

describe('SignUpValidationFactory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeSignUpValidation()
    const validations: Validation[] = []
    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
