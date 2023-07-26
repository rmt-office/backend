import { NextFunction, Request, Response, Router } from "express";
import userRoutes from './routes/user.routes'
import { errorHandling } from "./routes/errorHandling";
import { ErrorProps } from "./utils/types";

const router = Router()

router.use('/user', userRoutes)

router.use((error: ErrorProps, req: Request, res: Response, next: NextFunction): void => {
  errorHandling(error, req, res)
})

export default router