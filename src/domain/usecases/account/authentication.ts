import { AuthAccount } from '@/domain/models/auth-account'

export type AuthenticationParams = {
  email: string
  password: string
}

export interface Authentication {
  auth: (params: AuthenticationParams) => Promise<AuthAccount>
}
