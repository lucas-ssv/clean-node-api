import { InvalidParamError, MissingParamError } from '../../../../errors'
import { CompareFieldsValidation } from '../compare-fields-validation/compare-fields-validation'
import { RequiredFieldValidation } from '../required-field-validation/required-field-validation'
import { ValidationComposite } from './validation-composite'

const makeSut = (validations = []): ValidationComposite => new ValidationComposite(validations)

describe('ValidationComposite', () => {
  test('Should return an error if any validation fails', () => {
    const validations = [new RequiredFieldValidation('any_field')]
    const sut = makeSut(validations)
    const error = sut.validate({ other_field: 'any_value' })
    expect(error).toEqual(new MissingParamError('any_field'))
  })

  test('Should return the first error if more than one validation fails', () => {
    const validations = [
      new CompareFieldsValidation('another_field', 'another_field_to_compare'),
      new RequiredFieldValidation('other_field')
    ]
    const sut = makeSut(validations)
    const error = sut.validate({ other_field: 'any_value', another_field: 'any_another_field', another_field_to_compare: 'invalid_another_field' })
    expect(error).toEqual(new InvalidParamError('another_field_to_compare'))
  })
})
