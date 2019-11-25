import { Router } from 'express'
import { usersRouters } from './users'
import { articlesRouter } from './articles'

const router: Router = Router()

router.use('/api/v1/users', usersRouters)
router.use('/api/v1/articles', articlesRouter)

export { router }
