import { Request, Response } from "express";
import attachmentsService from "../services/attachmentService";
import { status } from "../loggers/constants";

export default class AwsController {

  async uploadAttachment(req: Request, res: Response): Promise<Response> {
    try {
      const attachment = await attachmentsService.uploadAttachment(req.files as Express.Multer.File[]);
      if (attachment instanceof Error || attachment == null || attachment == undefined) {
        return res.status(status.PAGE_NOT_FOUND).json({ message: attachment, error: true });
      }
      return res.status(status.SUCCESS).json(attachment);
    } catch (error: any) {
      return res.status(status.SERVER_ERROR).json({ message: error.message });
    }
  }

  async getSignedUrlForKeys(req: Request, res: Response): Promise<Response> {
    try {
      const keys = req.body as string[];
      const file = await attachmentsService.getSignedUrlForKeys(keys);
      if (file instanceof Error || file == null || file == undefined) {
        return res.status(status.PAGE_NOT_FOUND).json({ message: file, error: true });
      }
      return res.status(status.SUCCESS).json(file);
    } catch (error: any) {
      return res.status(status.SERVER_ERROR).json({ message: error });
    }
  }

  async deleteAttachmentById(req: Request, res: Response): Promise<Response> {
    try {
      const key = req.query.key as string;
      const file = await attachmentsService.deleteAttachmentById(key);
      if (file instanceof Error || file == null || file == undefined) {
        return res.status(status.PAGE_NOT_FOUND).json({ message: file, error: true });
      }
      return res.status(status.SUCCESS).json(file);
    } catch (error: any) {
      return res.status(status.SERVER_ERROR).json({ message: error });
    }
  }

}
