import { Validation } from '@/presentation/protocols/validation'
import { EmailValidation, RequiredFieldValidation, ValidationComposite } from '@/validation'
import { makeLoginValidation } from '@/main/factories/controllers/login/login-factory/login-validation/login-validation-factory'
import { EmailValidatorStub } from '@/validation/test/mock-email-validator'

jest.mock('@/validation/validators/validation-composite/validation-composite')

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
