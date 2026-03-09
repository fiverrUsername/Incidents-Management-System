import { KeyUrlPair } from "../interfaces/IAttachment";
import { CONSTANTS } from "../loggers/constants";
import logger from "../loggers/log";
import attachmentsRepository from "../repositories/attachmentRepository";

class AttachmentsService {

  async uploadAttachment(files: Express.Multer.File[]): Promise<void | any> {
    try {
      return await attachmentsRepository.uploadAttachment(files);;
    } catch (error: any) {
      logger.error({ source: CONSTANTS.UPLOAD_FILES, method: CONSTANTS.METHOD.GET, err: true });
      return error;
    }
  }

  async getSignedUrlForKeys(keys: String[]): Promise<KeyUrlPair[]> {
    try {
      logger.info({ source: CONSTANTS.GET_FILE_KEY_SUCCESS, msg: CONSTANTS.METHOD.GET, success: true });
      const signedUrls: KeyUrlPair[] = await attachmentsRepository.getSignedUrlForKeys(keys);
      return signedUrls;
    } catch (error: any) {
      logger.error({ source: CONSTANTS.GET_FILE_KEY_FAILED, method: CONSTANTS.METHOD.GET, err: true });
      return error;
    }
  }

  async deleteAttachmentById(key: string): Promise<void | any> {
    try {
      return await attachmentsRepository.deleteAttachmentById(key);
    } catch (error: any) {
      logger.error({ source: CONSTANTS.DELETE_FILE, method: CONSTANTS.METHOD.DELETE, error: true, attachmentKey: key });
      return error;
    }
  }

}

export default new AttachmentsService();