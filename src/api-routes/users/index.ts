import { Router } from 'express'
import * as usersHandlers from './handlers'

const router: Router = Router()

router.get('/', usersHandlers.get)
router.post('/', usersHandlers.create)

export { router as usersRouters }
