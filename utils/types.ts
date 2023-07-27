import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

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
	payload: Request & { payload?: jwt.JwtPayload }
}
