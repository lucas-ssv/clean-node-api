import { AuthAccount } from '../models/auth-account'

export interface Authentication {
  auth: (email: string, password: string) => Promise<AuthAccount>
}
