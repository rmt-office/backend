import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { User } from '../models/User.model'

type Overwrite<T1, T2> = { [Prop in Exclude<keyof T1, keyof T2>]: T1[Prop] } & T2 
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

export type NewUser = Overwrite<Pick<User, 'username' | 'password' | 'email' >, { password?: string, _id?: string }>

export type UpdateProps =  { filter: {}; infoUpdate: {}; options?: {} }