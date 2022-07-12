import { AccountModel } from '@/domain/models/account'

export const mockFakeAddAccountResult = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email',
  password: 'hashed_password'
})
