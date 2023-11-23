import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export type Overwrite<T1, T2> = { [Prop in Exclude<keyof T1, keyof T2>]: T1[Prop] } & T2
export interface ErrorProps {
	message: string
	status: number
	place?: string
	issues?: {
		message: any
		expected: string
		received: string
		path: string[]
	}[]
}

interface PayloadOptions {
	_id: string
}

export type RouteProps = {
	req: Request
	res: Response
	error: ErrorProps
	next: NextFunction
	payload: Request & { payload?: PayloadOptions; isAdmin?: boolean }
}

export type Timestamps = { createdAt: NativeDate; updatedAt: NativeDate }
