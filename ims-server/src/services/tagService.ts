import tagRepository from "../repositories/tagRepository";
import { ITag } from "../interfaces/tagInterface";
import { TagDto } from "../dto/tagDto";
import { validate } from "class-validator";
import logger from "../loggers/log";
import { CONSTANTS } from "../loggers/constants";

class TagService {
  
  async addTag(newTag: ITag): Promise<void | any> {
    try {
      const tag: TagDto = new TagDto(newTag);
      const validationErrors: any[] = await validate(tag);
      if (validationErrors.length > 0) {
        logger.error({
          source: CONSTANTS.TAG_SERVICE,
          err: "Validation error",
          validationErrors: validationErrors.map((error) => error.toString()),
        });
        return new Error("Validation error");
      }
      const _tag: ITag | null = await tagRepository.addTag(newTag);
      if (!_tag) {
        logger.error({ source: CONSTANTS.TAG_SERVICE, err: CONSTANTS.ERROR_ADDING_TAG, tag: newTag })
        return;
      }
      logger.info({ source: CONSTANTS.TAG_SERVICE, method: CONSTANTS.METHOD.POST, tag: _tag })
      return _tag;
    } catch (error) {
      console.error(`error: ${error}`);
      throw error;
    }
  }

  async getAllTags(): Promise<ITag[] | undefined> {
    try {
      const tags: ITag[] | null = await tagRepository.getAllTags();
      if (!tags) {
        logger.error({ source: CONSTANTS.TAG_SERVICE, method: CONSTANTS.METHOD.GET });
        return;
      }
      return tags;
    } catch (error) {
      console.error(`error: ${error}`);
      throw error;
    }
  }

}

export default new TagService();