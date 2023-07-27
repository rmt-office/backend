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
}

export interface PayloadRequest extends Request {
	payload?: jwt.JwtPayload
}
