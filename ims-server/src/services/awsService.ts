import { ITimelineEvent } from "../interfaces/ItimelineEvent";
import { constants } from "../loggers/constants";
import logger from "../loggers/log";
import awsRepository from "../repositories/awsRepository";
//import { File } from 'express-serve-static-core';


class AwsService {

  async uploadAttachment(files:Express.Multer.File[]): Promise<void | any> {
    try {
      logger.info({ source: constants.UPLOAD_FILES, msg: constants.METHOD.GET, success: true });
      const attachment = await awsRepository.uploadAttachment(files);
      return attachment;
    } catch (error:any) {
      logger.error({ source: constants.UPLOAD_FILES, method: constants.METHOD.GET, err: true });
      console.error(`error: ${error}`);
      return error;
    }
  }

  async getAllAttachmentByTimelineId(files:any, newTimelineEvent: ITimelineEvent): Promise<void | any> {
   
  }  

  async downloadAttachmentById(timeLineEventId:string):Promise<void|any>{
   
  }

  async deleteAttachmentById(timeLineEventId:string):Promise<void|any>{
   
  }



}

export default new AwsService();