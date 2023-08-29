import { type Request, type Response } from "express";
import { TagDto } from "../dto/tagDto";
import tagService from "../services/tagService";
import { status } from "../loggers/constants";

export default class TagController {
  
  async addTag(req: Request, res: Response): Promise<Response> {
    try {
      const tagData: TagDto = req.body;
      const tag: TagDto = await tagService.addTag(tagData);
      if (tag instanceof Error || tag == null || tag == undefined) {
        return res.status(status.SERVER_ERROR).json({ message: tag, error: true });
      } return res.status(status.CREATED_SUCCESS).json(tag);
    } catch (error: any) {
      return res.status(status.SERVER_ERROR).json({ message: error.message });
    }
  }

  async getAllTags(req: Request, res: Response): Promise<Response> {
    try {
      const tags = await tagService.getAllTags();
      if (tags instanceof Error || tags == null || tags == undefined) {
        return res.status(status.SERVER_ERROR).json({ message: tags, error: true });
      } return res.status(status.CREATED_SUCCESS).json(tags);
    } catch (error: any) {
      return res.status(status.SERVER_ERROR).json({ message: error });
    }
  }
}
