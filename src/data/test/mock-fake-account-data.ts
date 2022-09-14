import { AddAccountParams } from '@/domain/usecases/account/add-account'

export const mockFakeAccountData = (): AddAccountParams => ({
  name: 'valid_name',
  email: 'any_email@mail.com',
  password: 'valid_password'
})
