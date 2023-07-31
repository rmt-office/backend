import { UserModel, NewUser }  from "../models/User.model";
import { create, deleteOne, findAll, findOne, findOneAndUpdate } from "../mongoose/mongooseServices";
import { UpdateProps } from "../utils/types";

type DeleteOptions = { _id: string } | { username: string } | { email: string }

 class UserService {
  async createUser(user: NewUser) {
    return create(UserModel, user)
  }
  
  async getUsers() {
    return findAll(UserModel)
  }

  async getOneUser(filter: { email: string }) {
    return findOne(UserModel, filter)
  }

  async findOneAndUpdate(updateInfo: UpdateProps) {
    return findOneAndUpdate(UserModel, updateInfo)
  }

  async deleteOne(id: DeleteOptions) {
    return deleteOne(UserModel, id)
  }
}

export default new UserService()