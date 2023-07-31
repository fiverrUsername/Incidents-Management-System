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

interface AttachmentData {
  key: string;
  data: Buffer;
}
dotenv.config()
const s3 = new AWS.S3();
class AwsRepository {
  
  async uploadAttachment(files:Express.Multer.File []): Promise<AWS.S3.ManagedUpload.SendData | any> {
      const uploadPromises = files.map((file) => {
        const fileName = file.originalname;
        const fileBuffer = fs.readFileSync(file.path);
        if (fileName && fileBuffer) {
          const params: AWS.S3.PutObjectRequest = {
            Bucket: AwsRepository.getBucketName(),
            Key: fileName.toString().replace(/_/g, '/'),
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

  async getAttachment(key: string): Promise<AttachmentData|null> {
    try {
      const s3 = new AWS.S3();
      const params: AWS.S3.GetObjectRequest = {
        Bucket: AwsRepository.getBucketName(),
        Key: key.replace(/_/g, '/')
      };
      console.log(params)
      const result = await s3.getObject(params).promise();
      console.log("getAttachment  controllers-"+result.Body)
      const data: Buffer = result.Body as Buffer;
      logger.info({ source: constants.SHOW_SUCCESS, msg: constants.METHOD.GET, error: true });
      return { key, data };
    } catch (error:any) {
      if(error.code === 'NoSuchKey'){
        logger.info({source: constants.FILE_NOT_FOUND , msg: constants.METHOD.GET, key:key, error: true});
        return null
      }else{
        logger.error({ source: constants.SHOW_FAILED, method: constants.METHOD.GET, key:key, err: true });
      }
      throw error;
    }
  }

  async getAllAttachmentsByTimeline(keys: string[]): Promise<(AttachmentData|null)[]|any> {
    try {
      console.log(" Repository key"+keys)
      const allResponses: (AttachmentData | null)[] = await Promise.all(keys.map(
        (key) => this.getAttachment(key)));
      logger.info({ source: constants.SHOW_SUCCESS, method: constants.METHOD.GET, err: true });
      console.log("Repository allResponses"+allResponses[0]?.key)
      return allResponses;
    } catch (error) {
      logger.error({ source: constants.SHOW_FAILED, method: constants.METHOD.GET, err: true });
      throw error;
    }
  }

  async deleteAttachmentById(key: string): Promise<void | any> {
    const params: AWS.S3.DeleteObjectRequest = {
      Bucket: AwsRepository.getBucketName(),
      Key: key.replace(/_/g, '/')
    };
    try {
      console.log(params.Key)
      await s3.deleteObject(params).promise();
      logger.info({ source: constants.DELETE_FILE_SUCCESS, msg: constants.METHOD.GET, success: true });
    } catch (error:any) {
      if(error.code === 'NoSuchKey'){
        logger.info({source: constants.FILE_NOT_FOUND , msg: constants.METHOD.GET, key:key, error: true});
      }else{
        logger.error({ source: constants.DELETE_FILE_FAILED, msg: constants.METHOD.GET, error: true });
      }
    }
  }

  static getBucketName():string {
    if (!process.env.BUCKET_NAME) {
      logger.error({ source: constants.BUCKET_NAME, method: constants.METHOD.GET, err: true });
      return'';
    }else{
      return process.env.BUCKET_NAME ?process.env.BUCKET_NAME.toString():''
    }
  } 

}
export default new AwsRepository();