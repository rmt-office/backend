import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export type Overwrite<T1, T2> = { [Prop in Exclude<keyof T1, keyof T2>]: T1[Prop] } & T2
export interface ErrorProps {
	message: string
	place?: string
	status: number
	issues?: {
		message: any
		expected: string
		received: string
		path: string[]
	}[]
}

interface PayloadOptions extends jwt.JwtPayload {
	email?: string
	_id?: string
	username?: string
}

export type RouteProps = {
	req: Request
	res: Response
	error: ErrorProps
	next: NextFunction
	payload: Request & { payload?: PayloadOptions }
}

export type Timestamps = { createdAt: NativeDate; updatedAt: NativeDate }
