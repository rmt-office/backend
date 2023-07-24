import { Schema, model, Types } from 'mongoose'

interface User {
	email: string 
	password: string 
	username?: string
	isAdmin: boolean
	profileImage: string
	favorites: Types.ObjectId[]
}

const userSchema = new Schema(
	{
		email: {
			type: String,
			required: true,
			// maybe create a helper function or use zod
			match: /^\S+@\S+\.\S+$/, 
			trim: true,
			unique: true,
			lowercase: true
		},
		password: {
			type: String,
			required: true,
		},
		username: {
			type: String,
			unique: true
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