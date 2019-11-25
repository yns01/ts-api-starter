import express, { Request, Response } from 'express'

const app: express.Application = express()

app.use(express.json())

app.get('/', (_req: Request, res: Response) => {
  res.status(200).send()
})

export { app }
