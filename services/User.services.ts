import { UserModel, User }  from "../models/User.model";
import { create, findAll, findOne } from "../mongoose/mongooseServices";


type Overwrite<T1, T2> = { [Prop in Exclude<keyof T1, keyof T2>]: T1[Prop] } & T2 
export type NewUser = Overwrite<Pick<User, 'username' | 'password' | 'email'>, { password?: string }>

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