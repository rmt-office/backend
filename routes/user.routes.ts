import { Router } from "express";
import userController from "../controllers/user.controller";
import { isAuthenticated } from "../middlewares/isAuthenticated";

const router = Router()

router.put('/', isAuthenticated, userController.update)
router.put('/photo', isAuthenticated, userController.updatePhoto)
router.delete('/', isAuthenticated, userController.delete)

export default router