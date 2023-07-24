import AWS, { AWSError } from 'aws-sdk';
import fs from 'fs';  
import dotenv from 'dotenv';
import path from 'path';
import logger from "../loggers/log";
import { constants } from '../loggers/constants';
import FormData from 'form-data';
import { Blob } from 'buffer';
import { Readable } from 'stream';
import { Response } from 'express';


  dotenv.config()
  const s3 = new AWS.S3();
class AwsRepository {
  
  async uploadAttachment(files:Express.Multer.File []): Promise<AWS.S3.ManagedUpload.SendData | any> {
    if (!process.env.BUCKET_NAME) {
        logger.error({ source: constants.BUCKET_NAME, method: constants.METHOD.GET, err: true });
        return;
      }

      const uploadPromises = files.map((file) => {
        const fileName = file.originalname;
        const fileBuffer = fs.readFileSync(file.path);
        if (fileName && fileBuffer) {
          const params: AWS.S3.PutObjectRequest = {
            Bucket: process.env.BUCKET_NAME? process.env.BUCKET_NAME.toString(): '',
            Key: fileName.toString(),
            Body: fileBuffer,
          };
          return s3.upload(params).promise();
        }
      });
  
      try {
        const uploadResults = await Promise.all(uploadPromises);
        uploadResults.forEach((result) => {
          logger.info({ source: constants.UPLOAD_SUCCESS, msg: constants.METHOD.GET, success: true });
        });
      } catch (error) {
        logger.info({ source: constants.UPLOAD_FAILED, msg: constants.METHOD.GET, error: true });
      }
      
  }

  async getAllAttachmentByTimeline(keys: string[], res: Response): Promise<void> {
    try {
      if (!process.env.BUCKET_NAME) {
        logger.error({ source: constants.BUCKET_NAME, method: constants.METHOD.GET, err: true });
        return;
      }
  
      await Promise.all(keys.map(async (key) => {
        const params: AWS.S3.GetObjectRequest = {
          Bucket: process.env.BUCKET_NAME? process.env.BUCKET_NAME.toString(): '',
          Key: key
        };
  
        await new Promise((resolve, reject) => {
          s3.getObject(params)
            .createReadStream()
            .on('error', (e) => {
              logger.info({ source: constants.SHOW_FAILED, msg: constants.METHOD.GET, success: true });
              reject(e);
            })
            .pipe(res)
            .on('data', () => {});
        });
      }));
    } catch (error) {
      logger.info({ source: constants.DOWNLOAD_FILE_FAILED, msg: constants.METHOD.GET, error: true });
    }
  }

  async deleteAttachmentById(key:string):Promise<void | any> {
    if (!process.env.BUCKET_NAME) {
      logger.error({ source: constants.BUCKET_NAME, method: constants.METHOD.GET, err: true });
      return;
    }
    const params: AWS.S3.DeleteObjectRequest = {
      Bucket: process.env.BUCKET_NAME? process.env.BUCKET_NAME.toString(): '',
      Key:key
    };
    try {
      await s3.deleteObject(params).promise();
      logger.info({ source: constants.DELETE_FILE_SUCCESS, msg: constants.METHOD.GET, success: true });
  } catch (error) {
    logger.info({ source: constants.DELETE_FILE_FAILED, msg: constants.METHOD.GET, error: true });
  }
  }
  
}
export default new AwsRepository();