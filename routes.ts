import { NextFunction, Request, Response, Router } from "express";
import authRoutes from './routes/auth.routes'
import { errorHandling } from "./routes/errorHandling";
import { ErrorProps } from "./utils/types";

const router = Router()

router.use('/auth', authRoutes)

router.use((error: ErrorProps, req: Request, res: Response, next: NextFunction): void => {
  errorHandling(error, res)
})

export default router