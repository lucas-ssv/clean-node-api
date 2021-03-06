import { Collection, MongoClient } from 'mongodb'

export const MongoHelper = {
  client: null as MongoClient,
  url: null as string,
  connect: async function (url: string): Promise<void> {
    this.url = url
    this.client = await MongoClient.connect(url)
  },
  disconnect: async function (): Promise<void> {
    await this.client.close()
    this.client = null
  },
  getCollection: async function (name: string): Promise<Collection> {
    if (!this.client) {
      await this.connect(this.url)
    }
    return this.client.db().collection(name)
  },
  map: (collectionById: any): any => {
    const { _id, ...collectionWithoutId } = collectionById
    const account = Object.assign({}, collectionWithoutId, { id: _id.toHexString() })
    return account
  },
  mapCollection: (collection: any[]): any[] => {
    return collection.map(c => MongoHelper.map(c))
  }
}
