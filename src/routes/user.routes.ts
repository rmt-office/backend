import { Router } from 'express'
import userController from '../controllers/user.controller'
import { isAuthenticated } from '../middlewares/isAuthenticated'
import { isAdmin } from '../middlewares/isAdmin'

const router = Router()

router.use(isAuthenticated)
router.use(isAdmin)
router.put('/', userController.update)
router.put('/photo', userController.updatePhoto)
router.delete('/', userController.delete)

export default router
