import { Validation } from '../../../../presentation/helpers/validation/protocols/validation'
import { RequiredFieldValidation } from '../../../../presentation/helpers/validation/validators/required-field-validation/required-field-validation'
import { ValidationComposite } from '../../../../presentation/helpers/validation/validators/validation-composite/validation-composite'

export const makeSignUpValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
