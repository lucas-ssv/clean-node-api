import { Validation } from '../helpers/validation/protocols/validation'

export class ValidationStub implements Validation {
  validate (input: any): Error {
    return null
  }
}
