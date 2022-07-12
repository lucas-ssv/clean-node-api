import { AddAccountModel } from '@/domain/usecases/add-account'

export const mockFakeAccountData = (): AddAccountModel => ({
  name: 'valid_name',
  email: 'any_email@mail.com',
  password: 'valid_password'
})
