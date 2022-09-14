import { LogErrorRepository } from '../protocols/db/log/log-error-repository'

export class LogErrorRepositoryStub implements LogErrorRepository {
  async logError (stack: string): Promise<void> {
    return await Promise.resolve()
  }
}
