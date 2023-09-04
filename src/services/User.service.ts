import { UserModel, NewUser, User } from '../models/User.model'
import {
	UpdateProps,
	create,
	deleteOne,
	find,
	findOne,
	findOneAndUpdate,
} from '../database/mongooseServices'

type UpdateOptions = UpdateProps<User>
type FilterOptions = UpdateOptions['filter']
type QueryOptions = UpdateOptions['options']

class UserService {
	async createUser(user: NewUser) {
		return create(UserModel, user)
	}

	async getAllUsers(options?: QueryOptions) {
		return find(UserModel, {}, options)
	}

	async getOneUser(filter: FilterOptions, options?: QueryOptions) {
		return findOne(UserModel, filter, options)
	}

	async findOneAndUpdate(updateInfo: UpdateOptions) {
		return findOneAndUpdate(UserModel, updateInfo)
	}

	async deleteOne(id: FilterOptions) {
		return deleteOne(UserModel, id)
	}
}

export default new UserService()
