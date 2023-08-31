import tagRepository from "../repositories/tagRepository";
import { ITag } from "../interfaces/tagInterface";
import { TagDto } from "../dto/tagDto";
import { validate } from "class-validator";
import logger from "../loggers/log";
import { constants } from "../loggers/constants";

class TagService {

  async addTag(newTag: ITag): Promise<void | any> {
    try {
      const tag = new TagDto(newTag);
      const validationErrors = await validate(tag);
      if (validationErrors.length > 0) {
        logger.error({
          source: constants.TAG_SERVICE,
          err: "Validation error",
          validationErrors: validationErrors.map((error) => error.toString()),
        });
        return new Error("Validation error");
      }
      const _tag: ITag | null = await tagRepository.addTag(newTag);
      if (!_tag) {
        logger.error({ source: constants.TAG_SERVICE, err: constants.ERROR_ADDING_TAG, tag: newTag })
        return;
      }
      logger.info({ source: constants.TAG_SERVICE, method: constants.METHOD.POST, tag: _tag })
      return _tag;
    } catch (error) {
      console.error(`error: ${error}`);
    }
  }

  async getAllTags(): Promise<ITag[] | null | undefined> {
    try {
      const tags = await tagRepository.getAllTags();
      if (!tags) {
        logger.error({ source: constants.TAG_SERVICE, method: constants.METHOD.GET });
        return;
      }
      logger.info({ source: constants.TAG_SERVICE, method: constants.METHOD.GET });
      return tags;
    } catch (error) {
      logger.error({ source: constants.TAG_SERVICE, method: constants.METHOD.GET });
      console.error(`error: ${error}`);
    }
  }

}

export default new TagService();
