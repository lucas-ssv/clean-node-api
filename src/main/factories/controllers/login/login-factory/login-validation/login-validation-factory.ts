import { Validation } from '@/presentation/protocols/validation'
import { EmailValidation, RequiredFieldValidation, ValidationComposite } from '@/validation'
import { EmailValidatorAdapter } from '@/infra/validators/email-validator-adapter/email-validator-adapter'

export const makeLoginValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['email', 'password']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
  return new ValidationComposite(validations)
}
