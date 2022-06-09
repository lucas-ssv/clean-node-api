import { Validation } from '../../../../presentation/protocols/validation'
import { CompareFieldsValidation } from '../../../../presentation/helpers/validation/validators/compare-fields-validation/compare-fields-validation'
import { EmailValidation } from '../../../../presentation/helpers/validation/validators/email-validation/email-validation'
import { RequiredFieldValidation } from '../../../../presentation/helpers/validation/validators/required-field-validation/required-field-validation'
import { ValidationComposite } from '../../../../presentation/helpers/validation/validators/validation-composite/validation-composite'
import { EmailValidatorAdapter } from '../../../../utils/email-validator-adapter/email-validator-adapter'

export const makeSignUpValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
  return new ValidationComposite(validations)
}
