import { Collection, MongoClient } from 'mongodb'

export const MongoHelper = {
  client: null as MongoClient,
  connect: async function (url: string): Promise<void> {
    this.client = await MongoClient.connect(url)
  },
  disconnect: async function (): Promise<void> {
    await this.client.close()
  },
  getCollection: function (name: string): Collection {
    return this.client.db().collection(name)
  },
  map: (collectionById: any): any => {
    const { _id, ...collectionWithoutId } = collectionById
    const account = Object.assign({}, collectionWithoutId, { id: _id.toHexString() })
    return account
  }
}
