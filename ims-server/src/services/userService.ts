import userRepository from "../repositories/userRepository";
import { User } from "../interfaces/userI";
import logger from "../loggers/log";
import { CONSTANTS } from "../loggers/constants";

class UserService {
  async createUser(newUser: User): Promise<User | undefined> {
    try {
      const user: User | undefined = await userRepository.createUser(newUser);
      if (!user) {
        logger.error({ source: CONSTANTS.USER_SERVICE, method: CONSTANTS.METHOD.POST })
        return;
      }
      logger.info({ source: CONSTANTS.USER_SERVICE, method: CONSTANTS.METHOD.POST, user: user })
      return user;
    } catch (error) {
      logger.error({ source: CONSTANTS.USER_SERVICE, method: CONSTANTS.METHOD.POST })
      console.error(`error: ${error}`);
    }
  }
}

export default new UserService();