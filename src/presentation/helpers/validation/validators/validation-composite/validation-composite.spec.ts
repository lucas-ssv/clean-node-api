import { MissingParamError } from '../../../../errors'
import { RequiredFieldValidation } from '../required-field-validation/required-field-validation'
import { ValidationComposite } from './validation-composite'

describe('ValidationComposite', () => {
  test('Should return an error if any validation fails', () => {
    const validations = [new RequiredFieldValidation('any_field')]
    const sut = new ValidationComposite(validations)
    const error = sut.validate({ other_field: 'any_value' })
    expect(error).toEqual(new MissingParamError('any_field'))
  })
})
