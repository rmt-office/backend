import { UserModel, NewUser, UserInfer }  from "../models/User.model";
import { UpdateProps, create, deleteOne, findAll, findOne, findOneAndUpdate } from "../mongoose/mongooseServices";

type UpdateOptions = UpdateProps<UserInfer>
type FilterOptions = UpdateOptions['filter']

 class UserService {
  async createUser(user: NewUser) {
    return create(UserModel, user)
  }
  
  async getUsers() {
    return findAll(UserModel)
  }

  async getOneUser(filter: FilterOptions) {
    return findOne(UserModel, filter)
  }

  async findOneAndUpdate(updateInfo: UpdateOptions) {
    return findOneAndUpdate(UserModel, updateInfo)
  }

  async deleteOne(id: FilterOptions) {
    return deleteOne(UserModel, id)
  }
}

export default new UserService()