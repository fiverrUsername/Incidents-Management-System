import userRepository from "../repositories/userRepository";
import { User } from "../interfaces/userI";
import logger from "../loggers/log";
import { constants } from "../loggers/constants";

class UserService {
  async createUser(newUser: User): Promise<User | undefined> {
    try {
      const user: User | undefined = await userRepository.createUser(newUser);
      if (!user) {
        logger.error({ source: constants.USER_SERVICE, method: constants.METHOD.POST })
        return;
      }
      logger.info({ source: constants.USER_SERVICE, method: constants.METHOD.POST, user: user })
      return user;
    } catch (error) {
      logger.error({ source: constants.USER_SERVICE, method: constants.METHOD.POST })
      console.error(`error: ${error}`);
    }
  }
}
export default new UserService();
