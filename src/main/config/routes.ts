import { Express, Router } from 'express'
import { readdirSync } from 'fs'
import path from 'path'

export const setupRoutes = (app: Express): void => {
  const router = Router()
  app.use('/api', router)
  readdirSync(path.resolve(__dirname, '..', 'routes')).map(async file => {
    if (!file.includes('.test.') && !file.endsWith('.map')) {
      const route = await import(`../routes/${file}`)
      route.default(router)
    }
  })
}
