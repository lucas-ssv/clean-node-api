import { Validation } from '../protocols/validation'

export class ValidationStub implements Validation {
  validate (input: any): Error {
    return null
  }
}
