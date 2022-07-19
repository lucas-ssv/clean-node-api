import { AuthAccount } from '@/domain/models/auth-account'

export interface AuthenticationModel {
  email: string
  password: string
}

export interface Authentication {
  auth: (params: AuthenticationModel) => Promise<AuthAccount>
}
