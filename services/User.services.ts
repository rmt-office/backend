import { UserModel, User }  from "../models/User.model";
import { create, findAll, findOne } from "../mongoose/mongooseServices";
import { NewUser } from "../utils/types";

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
}

export default new UserService()