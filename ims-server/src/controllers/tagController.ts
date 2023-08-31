import { type Request, type Response } from "express";
import { TagDto } from "../dto/tagDto";
import tagService from "../services/tagService";
import { status } from "../loggers/constants";
export default class TagController {
  async addTag(req: Request, res: Response): Promise<void> {
    try {
      const tagData: TagDto = req.body;
      const tag: TagDto = await tagService.addTag(tagData);
      if (tag instanceof Error) {
        res.status(status.SERVER_ERROR).json({ message: tag, error: true });
      } else res.status(status.CREATED_SUCCESS).json(tag);
    } catch (error: any) {
      res.status(status.SERVER_ERROR).json({ message: error.message });
    }
  }

  async getAllTags(req: Request, res: Response): Promise<void> {
    try {
      const tags = await tagService.getAllTags();
      if (tags instanceof Error) {
        res.status(status.SERVER_ERROR).json({ message: tags, error: true });
      } else res.status(status.CREATED_SUCCESS).json(tags);
    } catch (error: any) {
      res.status(status.SERVER_ERROR).json({ message: error });
    }
  }
}
