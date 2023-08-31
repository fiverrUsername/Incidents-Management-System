import { User } from "../interfaces/userI";
import userModel from "../models/user";

class UserRepository {
  async createUser(newUser: User): Promise<User | undefined> {
    try {
      return await userModel.create(newUser);
    } catch (error) {
      console.error(`error: ${error}`);
    }
  }
}
export default new UserRepository();
