import { Router } from 'express'
import userController from '../controllers/user.controller'
import { isAuthenticated } from '../middlewares/isAuthenticated'
import { createUserSchema, loginSchema } from '../validationSchema/User.schema'
import { validate } from '../middlewares/validate'

const router = Router()

router.post('/signup', validate(createUserSchema), userController.signup)
router.post('/login', validate(loginSchema), userController.login)
router.get('/verify', isAuthenticated, userController.verify)
router.get('/:id', userController.emailVerification)

export default router
