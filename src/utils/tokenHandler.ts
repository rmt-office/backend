import jwt, { SignOptions } from 'jsonwebtoken'

export const createToken = (payload: Record<string, string>, expiresAt: SignOptions['expiresIn'] ) => {
	const token = jwt.sign(payload, process.env.TOKEN_SECRET!, { expiresIn: expiresAt })

	return token
}

export const verifyToken = (token: string) => {
	try {
	 	jwt.verify(token, process.env.TOKEN_SECRET!)
	} catch (error: any) {
		error.place = 'JWT validation'
		error.status = 400
		throw error
	}
}