import { Router } from "express";
import userController from "../controllers/user.controller";
import { RouteProps } from "../utils/types";

const router = Router()

router.post('/signup', userController.signup)

export default router