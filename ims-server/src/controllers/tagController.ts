import { type Request, type Response } from "express";
import { TagDto } from "../dto/tagDto";
import tagService from "../services/tagService";
import { STATUS } from "../loggers/constants";
import { ITag } from "../interfaces/tagInterface";
export default class TagController {
  async addTag(req: Request, res: Response): Promise<void> {
    try {
      const tagData: TagDto = req.body;
      const tag: TagDto = await tagService.addTag(tagData);
      if (tag instanceof Error) {
        res.status(STATUS.SERVER_ERROR).json({ message: tag, error: true });
      } else res.status(STATUS.CREATED_SUCCESS).json(tag);
    } catch (error: any) {
      res.status(STATUS.SERVER_ERROR).json({ message: error.message });
    }
  }

  async getAllTags(_req: Request, res: Response): Promise<void> {
    try {
      const tags: ITag[] | undefined = await tagService.getAllTags();
      if (tags instanceof Error) {
        res.status(STATUS.SERVER_ERROR).json({ message: tags, error: true });
      } else res.status(STATUS.CREATED_SUCCESS).json(tags);
    } catch (error: any) {
      res.status(STATUS.SERVER_ERROR).json({ message: error });
    }
  }
}