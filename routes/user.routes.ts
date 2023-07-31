import { Router } from "express";
import userController from "../controllers/user.controller";
import { isAuthenticated } from "../middlewares/isAuthenticated";

const router = Router()

router.delete('/delete', isAuthenticated, userController.delete)


export default router