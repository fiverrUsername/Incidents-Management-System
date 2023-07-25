import { Response } from 'express';
import { constants } from "../loggers/constants";
import logger from "../loggers/log";
import awsRepository from "../repositories/awsRepository";



class AwsService {

  async uploadAttachment(files: Express.Multer.File[]): Promise<void | any> {
    try {
      logger.info({ source: constants.UPLOAD_FILES, msg: constants.METHOD.GET, success: true });
      const attachment = await awsRepository.uploadAttachment(files);
      return attachment;
    } catch (error: any) {
      logger.error({ source: constants.UPLOAD_FILES, method: constants.METHOD.GET, err: true });
      console.error(`error: ${error}`);
      return error;
    }
  }

  async getAllAttachmentByTimeline(filesKey: string[], res: Response): Promise<void | any> {
    try {
      logger.info({ source: constants.SHOW_FILES, msg: constants.METHOD.GET, success: true });
      const keys = await awsRepository.getAllAttachmentByTimeline(filesKey, res);
      return keys;
    } catch (error: any) {
      logger.error({ source: constants.SHOW_FILES, method: constants.METHOD.GET, err: true });
    }
  }


  async deleteAttachmentById(key: string): Promise<void | any> {
    try {
      logger.info({ sourece: constants.DELETE_FILE, method: constants.METHOD.DELETE, attachmentKey: key });
      return await awsRepository.deleteAttachmentById(key);
    } catch (error: any) {
      logger.error({ source: constants.DELETE_FILE, method: constants.METHOD.DELETE, error: true, attachmentKey: key });
      console.error(`error: ${error}`);
      return error;
    }
  }
}

export default new AwsService();