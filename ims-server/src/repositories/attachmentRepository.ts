import dotenv from 'dotenv';
import fs from 'fs';
import { KeyUrlPair } from '../interfaces/IAttachment';
import { CONSTANTS } from '../loggers/constants';
import logger from "../loggers/log";
import * as AWS from 'aws-sdk';

dotenv.config()
const expiration: number = 3600;

const s3: AWS.S3 = new AWS.S3({
  region: process.env.AWS_REGION,
});

AWS.config.getCredentials(function (err) {
  if (err) console.log(err.stack);
  // credentials not loaded
  else {
    logger.info({ source: CONSTANTS.UPLOAD_SUCCESS, msg: CONSTANTS.METHOD.GET, success: true });
    console.log("Access key:", AWS.config.credentials?.accessKeyId);
  }
});
class AttachmentsRepository {

  async uploadAttachment(files: Express.Multer.File[]): Promise<AWS.S3.ManagedUpload.SendData | any> {
    const uploadPromises: (Promise<AWS.S3.ManagedUpload.SendData> | undefined)[] = files.map((file) => {
      const fileName: string = file.originalname;
      const fileBuffer: Buffer = fs.readFileSync(file.path);
      if (fileName && fileBuffer) {
        const params: AWS.S3.PutObjectRequest = {
          Bucket: AttachmentsRepository.getBucketName(),
          Key: fileName.toString().replace(/\?/g, '/'),
          Body: fileBuffer,
        };
        return s3.upload(params).promise();
      }
    });
    try {
      const uploadResults: PromiseSettledResult<AWS.S3.ManagedUpload.SendData | undefined>[] = await Promise.allSettled(uploadPromises);
      uploadResults.forEach(() => {
        logger.info({ source: CONSTANTS.UPLOAD_SUCCESS, msg: CONSTANTS.METHOD.GET, success: true });
      });
    } catch (error) {
      logger.info({ source: CONSTANTS.UPLOAD_FAILED, msg: CONSTANTS.METHOD.GET, error: true });
    }
  }

  async getSignedUrlForKey(key: String): Promise<String> {
    const params = {//: AWS.S3.GetSignedUrlRequest
      Bucket: AttachmentsRepository.getBucketName(),
      Key: key.replace(/\?/g, '/'),
      Expires: expiration,
    };
    try {
      const signedUrl: string = await s3.getSignedUrlPromise('getObject', params);
      logger.info({ source: CONSTANTS.SIGNED_URL_OF_FILE_SUCCESS, msg: 'GET', success: true });
      return signedUrl;
    } catch (error) {
      logger.error({ source: CONSTANTS.SIGNED_URL_OF_FILE_FAILED, msg: 'GET', error: error });
      throw error;
    }
  }

  async getSignedUrlForKeys(keys: String[]): Promise<KeyUrlPair[]> {
    try {
      const allResponses: KeyUrlPair[] = await Promise.all(
        keys.map(async (key) => {
          const url: String = await this.getSignedUrlForKey(key);
          return { key, url };
        })
      );

      logger.info({ source: CONSTANTS.GET_FILE_KEY_FAILED, method: CONSTANTS.METHOD.GET, err: true });
      return allResponses;
    } catch (error) {
      logger.error({ source: CONSTANTS.SHOW_FAILED, method: CONSTANTS.METHOD.GET, err: true, error: true });
      throw error;
    }
  }

  async deleteAttachmentById(key: string): Promise<void | any> {
    const params: AWS.S3.DeleteObjectRequest = {
      Bucket: AttachmentsRepository.getBucketName(),
      Key: key.replace(/\?/g, '/')
    };
    try {
      await s3.deleteObject(params).promise();
      logger.info({ source: CONSTANTS.DELETE_FILE_SUCCESS, msg: CONSTANTS.METHOD.GET, success: true });
    } catch (error: any) {
      if (error.code === 'NoSuchKey') {
        logger.info({ source: CONSTANTS.FILE_NOT_FOUND, msg: CONSTANTS.METHOD.GET, key: key, error: true });
      } else {
        logger.error({ source: CONSTANTS.DELETE_FILE_FAILED, msg: CONSTANTS.METHOD.GET, error: true });
      }
    }
  }

  static getBucketName(): string {
    if (!process.env.BUCKET_NAME) {
      logger.error({ source: CONSTANTS.BUCKET_NAME, method: CONSTANTS.METHOD.GET, err: true });
      return '';
    } else {
      return process.env.BUCKET_NAME ? process.env.BUCKET_NAME.toString() : ''
    }
  }

}

export default new AttachmentsRepository();