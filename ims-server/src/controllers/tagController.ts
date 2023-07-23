import { type Request, type Response } from "express";
import tagService from "../services/tagService";
import { TagDto } from "../classValidator/tagValidation";

export default class TagController {
  async addTag(req: Request, res: Response): Promise<void> {
    try {
      const tagData: TagDto = req.body;
      const tag: TagDto = await tagService.addTag(tagData);
      if (tag instanceof Error) {
        res.status(500).json({ message: tag, error: true });
      } else res.status(201).json(tag);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async getAllTags(req: Request, res: Response): Promise<void> {
    try {
      const tags = await tagService.getAllTags();
      if (tags instanceof Error) {
        res.status(500).json({ message: tags, error: true });
      } else res.status(201).json(tags);
    } catch (error: any) {
      res.status(500).json({ message: error });
    }
  }
}
