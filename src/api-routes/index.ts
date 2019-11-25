import { Router } from 'express'
import { usersRouters } from './users'
import { articlesRouter } from './articles'

const router: Router = Router()

router.use('/users', usersRouters)
router.use('/articles', articlesRouter)

export { router }
