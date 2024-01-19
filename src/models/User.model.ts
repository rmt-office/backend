import { Schema, model, HydratedDocument, InferSchemaType } from 'mongoose'
import { Overwrite } from '../utils/types'

const userSchema = new Schema(
	{
		email: {
			type: String,
			required: true,
			match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
			trim: true,
			unique: true,
			lowercase: true,
		},
		password: {
			type: String,
			required: true,
			match: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
		},
		username: {
			type: String,
			unique: true,
		},
		canUpdateOn: {
			type: String,
			default: 'first',
		},
		verificationToken: String,
		isVerified: {
			type: Boolean,
			default: false,
		},
		isAdmin: {
			type: Boolean,
			default: false,
		},
		profilePicture: String,
		favorites: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Place',
			},
		],
	},
	{ timestamps: true }
)

type UserInfer = HydratedDocument<typeof userSchema>
type User = InferSchemaType<typeof userSchema>
type UserPick = Pick<User, 'username' | 'password' | 'email'| 'verificationToken'>
type NewUser = Overwrite<UserPick, { password?: string; _id?: string; profilePicture?: string }>

const UserModel = model<User>('User', userSchema)

export { UserModel, User, UserInfer, NewUser }
