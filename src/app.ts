import express from 'express'
import { router } from './api-routes'
import { notFoundHandler } from './middlewares/notFoundHandler'
import { genericErrorHandler } from './middlewares/genericErrorHandler'

const app: express.Application = express()

app.use(express.json())

app.use('/', router)

app.use(notFoundHandler)
app.use(genericErrorHandler)

export { app }
