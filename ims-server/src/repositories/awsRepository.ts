import AWS, { AWSError } from 'aws-sdk';
import fs from 'fs';  
import dotenv from 'dotenv';
import path from 'path';
import logger from "../loggers/log";
import { constants } from '../loggers/constants';
import { PutObjectRequest } from 'aws-sdk/clients/s3';

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
        const fileBody = file;
        const fileBuffer = fs.readFileSync(file.path);
        if (fileName && fileBuffer) {
          const params: PutObjectRequest = {
            Bucket: process.env.BUCKET_NAME? process.env.BUCKET_NAME.toString(): '',
            Key: fileName.toString(),
            Body: fileBuffer,
          };
          //loger succees
          return s3.upload(params).promise();
        }
      });
  
      try {
        const uploadResults = await Promise.all(uploadPromises);
        uploadResults.forEach((result) => {
          logger.info({ source: constants.UPLOAD_SUCCESS, msg: constants.METHOD.GET, success: true });
        });
      } catch (error) {
        logger.info({ source: constants.UPLOAD_FAILED, msg: constants.METHOD.GET, success: true });
      }
      
  }

//   static uploadFileToS3 = async ( fileName: string, filePath: string) => {
//     if (!process.env.BUCKET_NAME) {
//         logger.error('BUCKET_NAME environment variable is not set.');
//         return;
//       }
//     const params = {
//         Bucket: process.env.BUCKET_NAME,
//         Key: fileName,
//         Body: require('fs').createReadStream(filePath)
//     };
//     try {
//         const result = await s3.upload(params).promise();
//         console.log('File uploaded successfully:', result.Location);
//     } catch (error) {
//         console.error('Error uploading file to S3:', error);
//     }
// }

  async getAllAttachmentByTimelineId(): Promise< | any> {

  }

  async downloadAttachmentById(): Promise<void | any> {

  }

  async deleteAttachmentById():Promise<void | any> {

  }
  
}
export default new AwsRepository();