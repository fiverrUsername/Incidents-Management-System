import AWS from 'aws-sdk';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import logger from "../loggers/log";

dotenv.config()
const s3 = new AWS.S3();

export default class ServicesS3 {
    static uploadFileToS3 = async ( fileName: string, filePath: string) => {
        if (!process.env.BUCKET_NAME) {
            logger.error('BUCKET_NAME environment variable is not set.');
            return;
          }
        const params = {
            Bucket: process.env.BUCKET_NAME,
            Key: fileName,
            Body: require('fs').createReadStream(filePath)
        };
        try {
            const result = await s3.upload(params).promise();
            console.log('File uploaded successfully:', result.Location);
        } catch (error) {
            console.error('Error uploading file to S3:', error);
        }
    }
    static downloadFileFromS3 = async (fileName: string, saveAsFileName: string) => {
        if (!process.env.BUCKET_NAME) {
            logger.error('BUCKET_NAME environment variable is not set.');
            return;
          }
        const params = {
            Bucket: process.env.BUCKET_NAME,
            Key: fileName
        };
        try {
            const downloadsDirectory = require('os').homedir() + '/Downloads';
            const filePath = path.join(downloadsDirectory, saveAsFileName);
            const fileStream = fs.createWriteStream(filePath);
            const data = await s3.getObject(params).promise();
            fileStream.write(data.Body);
            fileStream.end();
            console.log('File downloaded successfully:', filePath);
        } catch (error) {
            console.error('Error downloading file from S3:', error);
        }
    }
    static deleteFileFromS3 = async ( fileName: string) => {
        if (!process.env.BUCKET_NAME) {
            logger.error('BUCKET_NAME environment variable is not set.');
            return;
          }
        const params = {
            Bucket: process.env.BUCKET_NAME,
            Key: fileName
        };
        try {
            const data = await s3.deleteObject(params).promise();
            console.log('File ', params.Key, ' deleted');
        } catch (error) {
            console.error('Error downloading file from S3:', error);
        }
    }
    static showFileFromS3 = async (fileName: string) => {
        if (!process.env.BUCKET_NAME) {
            logger.error('BUCKET_NAME environment variable is not set.');
            return;
          }
        const params = {
            Bucket: process.env.BUCKET_NAME,
            Key: fileName
        };
        try {
            const data = await s3.getObject(params).promise();
            return data.Body;
        } catch (error) {
            logger.error('Error downloading file from S3:', error);
        }
    }
}