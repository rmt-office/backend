import { UserModel, User }  from "../models/User.model";
import { create, findAll, findOne, findOneAndUpdate } from "../mongoose/mongooseServices";
import { NewUser, UpdateProps } from "../utils/types";

 class UserService {
  async createUser(user: NewUser) {
    return create(UserModel, user)
  }
  
  async getUsers() {
    return findAll(UserModel)
  }

  async getOneUser(filter: {}) {
    return findOne(UserModel, filter)
  }

  async findOneAndUpdate(updateInfo: UpdateProps) {
    return findOneAndUpdate(UserModel, updateInfo)
  }
}

export default new UserService()