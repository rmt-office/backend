import { Router } from "express";
import userController from "../controllers/user.controller";
import { isAuthenticated } from "../middlewares/isAuthenticated";

const router = Router()

router.post('/signup', userController.signup)
router.post('/login', userController.login)
router.get('/verify', isAuthenticated ,userController.verify)

export default router