import { InvalidParamError } from '../../../../errors'
import { CompareFieldsValidation } from './compare-fields-validation'

describe('CompareFieldsValidation', () => {
  test('Should return InvalidParamError if comparation fails', () => {
    const sut = new CompareFieldsValidation('any_field', 'any_field_to_compare')
    const error = sut.validate({ any_field: 'any_field', any_field_to_compare: 'invalid_field_to_compare' })
    expect(error).toEqual(new InvalidParamError('any_field_to_compare'))
  })

  test('Should not return if comparation succeeds', () => {
    const sut = new CompareFieldsValidation('any_field', 'any_field_to_compare')
    const error = sut.validate({ any_field: 'valid_field', any_field_to_compare: 'valid_field' })
    expect(error).toBeFalsy()
  })
})
