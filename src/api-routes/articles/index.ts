import { Router, Request, Response } from 'express'

const router: Router = Router()

router.get('/', (_req: Request, res: Response) => {
  res.status(200).send({})
})

router.post('/', (_req: Request, res: Response) => {
  res.status(204).send()
})

export { router as articlesRouter }
