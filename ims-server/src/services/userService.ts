import userRepository from "../repositories/userRepository";
import { User } from "../interfaces/userI";

class UserService {
  async createUser(newUser: User): Promise<void | null> {
    try {
      return await userRepository.createUser(newUser);
    } catch (error) {
      console.error(`error: ${error}`);
    }
  }
}
export default new UserService();
