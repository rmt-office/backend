import { Request, Response, NextFunction } from "express"

export interface ErrorProps {
	message: string
	place?: string
	status: number
}

export type RouteProps = {
  req: Request
  res: Response
  error: ErrorProps
  next: NextFunction
}