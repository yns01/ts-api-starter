import express, { Request, Response } from 'express'

const app: express.Application = express()

app.get('/', (_req: Request, res: Response) => {
  console.log('fu')
  res.status(200).send()
})

export { app }
