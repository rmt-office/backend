import { Schema, model, HydratedDocument, InferSchemaType } from 'mongoose'
import { Overwrite } from '../utils/types'


type UserPick = Pick<User, 'username' | 'password' | 'email'>
type NewUser = Overwrite<UserPick, { password?: string, _id?: string }>

const userSchema = new Schema(
	{
		// TODO: Username last update
		// TODO: Update Object for email confirmation
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
		canUpdateOn: { 
			type: String, 
			default: 'first' 
		},
		isVerified: {
			type: Boolean,
			default: false
		},
		isAdmin: {
			type: Boolean,
			default: false
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

const user = model<User>('User', userSchema)

export { user as UserModel, User, UserInfer, NewUser }