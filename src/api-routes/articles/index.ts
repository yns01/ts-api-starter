import { Router } from 'express'
import * as articlesHandlers from './handlers'

const router: Router = Router()

router.get('/', articlesHandlers.get)

router.post('/', articlesHandlers.create)

export { router as articlesRouter }
