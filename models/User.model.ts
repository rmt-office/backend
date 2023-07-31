import { Schema, model, Types } from 'mongoose'
import { Overwrite } from '../utils/types'

interface User {
	email: string 
	password: string 
	username?: string
	isAdmin: boolean
	profileImage: string
	isVerified: boolean
	favorites: Types.ObjectId[]
}

type UserPick = Pick<User, 'username' | 'password' | 'email' >
export type NewUser = Overwrite<UserPick, { password?: string, _id?: string }>

const userSchema = new Schema(
	{
		email: {
			type: String,
			required: true,
			match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/, 
			trim: true,
			unique: true,
			lowercase: true
		},
		password: {
			type: String,
			required: true,
			match: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
		},
		username: {
			type: String,
			unique: true
		},
		isVerified: {
			type: Boolean,
			default: false
		},
		isAdmin: {
			type: Boolean,
			default: false
		},
		favorites: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Place',
			},
		],
	},
	{ timestamps: true }
)

const user = model<User>('User', userSchema)

export { user as UserModel, User }