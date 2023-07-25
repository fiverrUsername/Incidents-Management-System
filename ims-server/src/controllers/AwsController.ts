import { Request, Response } from "express";
import awsService from "../services/awsService";
import { status } from "../loggers/constants";

export default class AwsController {
  async uploadAttachment(req: Request, res: Response): Promise<void> {
    try {
      const attachment = await awsService.uploadAttachment(
        req.files as Express.Multer.File[]
      );
      if (attachment instanceof Error) {
        res
          .status(status.PAGE_NOT_FOUND)
          .json({ message: attachment, error: true });
      } else res.status(status.SUCCESS).json(attachment);
    } catch (error: any) {
      res.status(status.SERVER_ERROR).json({ message: error.message });
    }
  }

  // async getAllAttachmentByTimeline(req: Request, res: Response): Promise<void> {
  //   try {
  //     // const filesKey = await awsService.getAllAttachmentByTimeline(req.body);
  //     if (filesKey instanceof Error) {
  //       res
  //         .status(status.PAGE_NOT_FOUND)
  //         .json({ message: filesKey, error: true });
  //     } else res.status(status.SUCCESS).json(filesKey);
  //   } catch (error: any) {
  //     res.status(status.SERVER_ERROR).json({ message: error.message });
  //   }
  // }

  // async downloadAttachmentById(req: Request, res: Response): Promise<void> {
  //   try {
  //     // const file = await awsService.downloadAttachmentById(req.params.key);
  //     if (file instanceof Error) {
  //       res.status(status.PAGE_NOT_FOUND).json({ message: file, error: true });
  //     } else res.status(status.SUCCESS).json(file);
  //   } catch (error: any) {
  //     res.status(status.SERVER_ERROR).json({ message: error.message });
  //   }
  // }

  async deleteAttachmentById(req: Request, res: Response): Promise<void> {
    try {
      const file = await awsService.deleteAttachmentById(req.params.key);
      if (file instanceof Error) {
        res.status(status.PAGE_NOT_FOUND).json({ message: file, error: true });
      } else res.status(status.SUCCESS).json(file);
    } catch (error: any) {
      res.status(status.SERVER_ERROR).json({ message: error });
    }
  }
}
