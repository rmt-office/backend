import jwt from 'jsonwebtoken'
import { NewUser } from '../models/User.model'

export const createToken = (user: NewUser) => {
	const payload = {
		_id: user._id,
	}
	const token = jwt.sign(payload, process.env.TOKEN_SECRET!, { expiresIn: '24h' })

	return token
}
