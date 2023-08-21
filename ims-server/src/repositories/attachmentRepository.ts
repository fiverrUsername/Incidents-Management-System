import AWS, { AWSError } from 'aws-sdk';
import fs from 'fs';
import dotenv from 'dotenv';
import logger from "../loggers/log";
import { constants } from '../loggers/constants';
import { KeyUrlPair } from '../interfaces/IAttachment';
const expiration = 3600;
dotenv.config()
const s3 = new AWS.S3();


class AttachmentsRepository {

  async uploadAttachment(files: Express.Multer.File[]): Promise<AWS.S3.ManagedUpload.SendData | any> {
    const uploadPromises = files.map((file) => {
      const fileName = file.originalname;
      const fileBuffer = fs.readFileSync(file.path);
      if (fileName && fileBuffer) {
        const params: AWS.S3.PutObjectRequest = {
          Bucket: AttachmentsRepository.getBucketName(),
          Key: fileName.toString().replace(/_/g, '/'),
          Body: fileBuffer,
        };
        return s3.upload(params).promise();
      }
    });
    try {
      const uploadResults = await Promise.allSettled(uploadPromises);
      uploadResults.forEach((result) => {
        logger.info({ source: constants.UPLOAD_SUCCESS, msg: constants.METHOD.GET, success: true });
      });
    } catch (error) {
      logger.info({ source: constants.UPLOAD_FAILED, msg: constants.METHOD.GET, error: true });
    }
  }

  async getSignedUrlForKey(key: String): Promise<String> {
    const params = {
      Bucket: AttachmentsRepository.getBucketName(),
      Key: key.replace(/_/g, '/'),
      Expires: expiration,
    };
    try {
      const signedUrl = await s3.getSignedUrlPromise('getObject', params);
      logger.info({ source: constants.SIGNED_URL_OF_FILE_SUCCESS, msg: 'GET', success: true });
      return signedUrl;
    } catch (error) {
      logger.error({ source: constants.SIGNED_URL_OF_FILE_FAILED, msg: 'GET', error: error });
      throw error;
    }
  }

  async getSignedUrlForKeys(keys: String[]): Promise<KeyUrlPair[]> {
    try {
      const allResponses: KeyUrlPair[] = await Promise.all(
        keys.map(async (key) => {
          const url = await this.getSignedUrlForKey(key);
          return { key, url };
        })
      );
  
      logger.info({ source: constants.GET_FILE_KEY_FAILED, method: constants.METHOD.GET, err: true });
      return allResponses;
    } catch (error) {
      logger.error({ source: constants.SHOW_FAILED, method: constants.METHOD.GET, err: true, error: true });
      throw error;
    }
  }

  async deleteAttachmentById(key: string): Promise<void | any> {
    const params: AWS.S3.DeleteObjectRequest = {
      Bucket: AttachmentsRepository.getBucketName(),
      Key: key.replace(/_/g, '/')
    };
    try {
      await s3.deleteObject(params).promise();
      logger.info({ source: constants.DELETE_FILE_SUCCESS, msg: constants.METHOD.GET, success: true });
    } catch (error: any) {
      if (error.code === 'NoSuchKey') {
        logger.info({ source: constants.FILE_NOT_FOUND, msg: constants.METHOD.GET, key: key, error: true });
      } else {
        logger.error({ source: constants.DELETE_FILE_FAILED, msg: constants.METHOD.GET, error: true });
      }
    }
  }

  static getBucketName(): string {
    if (!process.env.BUCKET_NAME) {
      logger.error({ source: constants.BUCKET_NAME, method: constants.METHOD.GET, err: true });
      return '';
    } else {
      return process.env.BUCKET_NAME ? process.env.BUCKET_NAME.toString() : ''
    }
  }

}
export default new AttachmentsRepository();



