import { AddAccountModel } from '../../domain/usecases/add-account'

export const mockFakeAccountData = (): AddAccountModel => ({
  name: 'valid_name',
  email: 'valid_email',
  password: 'valid_password'
})
