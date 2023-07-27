import jwt from "jsonwebtoken"
import { PayloadRequest, RouteProps } from "../utils/types"
import { throwError } from "../utils/throwError"


export const isAuthenticated = (req: PayloadRequest, res: RouteProps['res'], next: RouteProps['next']) => {
  try {
    const bearer = req.headers.authorization
    if (bearer) {
      const token = bearer.split(' ')[1]

      if (token) {
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!)
        req.payload = { ...decodedToken as jwt.JwtPayload }
        next()
      } else {
        const error = {
          message: 'Token not found',
          status: 401
        }
        throwError(error)
      } 
    } else {
      const error = {
        message: 'Headers and/or authorization not found',
        status: 401
      }
      throwError(error)
    } 
  } catch (error: any) {
    error.place = 'JWT middleware'
    if (error.message === 'invalid signature') {
      error.status = 401
    }
    next(error)
  }
}