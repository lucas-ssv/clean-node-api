import { MissingParamError } from '@/presentation/errors'
import { RequiredFieldValidation } from './required-field-validation'

const makeSut = (fieldName = 'any_field'): RequiredFieldValidation => new RequiredFieldValidation(fieldName)

describe('RequiredFieldValidation', () => {
  test('Should return a MissingParamError if validation fails', () => {
    const field = 'any_field'
    const sut = makeSut(field)
    const error = sut.validate({ name: 'any_name' })
    expect(error).toEqual(new MissingParamError(field))
  })

  test('Should not return if validation succeeds', () => {
    const field = 'any_field'
    const sut = makeSut(field)
    const error = sut.validate({ [field]: 'any_value' })
    expect(error).toBeFalsy()
  })
})
