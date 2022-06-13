import { UpdateAccessTokenRepository } from '../protocols/db/account/update-access-token-repository'

export class UpdateAccessTokenRepositoryStub implements UpdateAccessTokenRepository {
  async updateAccessToken (id: string, token: string): Promise<void> {
    return await Promise.resolve()
  }
}
