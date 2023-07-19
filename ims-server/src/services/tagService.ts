import tagRepository from "../repositories/tagRepository";
import { ITag } from "../interfaces/tagInterface";
import { Tag } from "../classValidator/tagValidation";
import { validate } from "class-validator";
import logger from "../loggers/log";
import { constants } from "../loggers/constants";

class TagService {
  async addTag(newTag: ITag): Promise<void> {
    try {
      const tag = new Tag();
      Object.assign(tag, newTag);
      const validationErrors = await validate(tag);
      if (validationErrors.length > 0) {
        logger.error({
          source: constants.TAG_SERVICE,
          err: "Validation error",
          validationErrors: validationErrors.map((error) => error.toString()),
        });
        throw new Error("Validation error");
      }
    } catch (error) {
      console.error(`error: ${error}`);
      throw error;
    }
  }

  async getAllTags(): Promise<ITag[]> {
    try {
      const tags = await tagRepository.getAllTags();
      if (tags === null) {
        throw new Error("Failed to retrieve tags");
      }
      return tags;
    } catch (error) {
      console.error(`error: ${error}`);
      throw error;
    }
  }
}

export default new TagService();
