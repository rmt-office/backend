import UserModel from "../models/User.model";
import { create, findAll } from "../mongoose/mongooseServices";

export type User = {
  username: string, 
  password: string, 
  email: string
}
 class UserService {
  async createUser(user: User) {
    return create(UserModel, user)
  }

  async getUsers() {
    return findAll(UserModel)
  }
}

export default new UserService()