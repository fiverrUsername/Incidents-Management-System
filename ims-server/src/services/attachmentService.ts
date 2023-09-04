import { KeyUrlPair } from "../interfaces/IAttachment";
import { constants } from "../loggers/constants";
import logger from "../loggers/log";
import attachmentsRepository from "../repositories/attachmentRepository";

class AttachmentsService {
  
  async uploadAttachment(files: Express.Multer.File[]): Promise<void | any> {
    try {
      return await attachmentsRepository.uploadAttachment(files);;
    } catch (error: any) {
      logger.error({ source: constants.UPLOAD_FILES, method: constants.METHOD.GET, err: true });
      return error;
    }
  }

  async getSignedUrlForKeys(keys:String[]): Promise<KeyUrlPair[]> {
    try {
     logger.info({ source: constants.GET_FILE_KEY_SUCCESS, msg: constants.METHOD.GET, success: true });
      const signedUrl = await attachmentsRepository.getSignedUrlForKeys(keys);
      return signedUrl;
    } catch (error: any) {
      logger.error({ source: constants.GET_FILE_KEY_FAILED, method: constants.METHOD.GET, err: true });
      return error;
    }
  }

  async deleteAttachmentById(key: string ): Promise<void | any> {
    try {
      return await attachmentsRepository.deleteAttachmentById(key);
    } catch (error: any) {
      logger.error({ source: constants.DELETE_FILE, method: constants.METHOD.DELETE, error: true, attachmentKey: key });
      return error;
    }
  }

}
export default new AttachmentsService();
