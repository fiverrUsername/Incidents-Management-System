import AWS from 'aws-sdk';
import { constants } from "../../loggers/constants";
import logger from "../../loggers/log";

const s3: AWS.S3 = new AWS.S3({
  region: process.env.AWS_REGION,
});

AWS.config.getCredentials(function (err) {
  if (err) console.log(err.stack);
  else {
    logger.info({ source: constants.ACCESS_KEY, msg: AWS.config.credentials?.accessKeyId, success: true });
    console.log("Access key:", AWS.config.credentials?.accessKeyId);
  }
});
export async function fileResponse(files: any[], incidentId: string): Promise<string[]> {
  const filesKeys: string[] = [];
  try {
    await Promise.all(files.map(async (file) => {
      const newName: string = `incidence?${incidentId}?${Date.now()}${file.name}`;
      filesKeys.push(newName);
      const params: AWS.S3.PutObjectRequest = {
        Bucket: 'ims-fiverr',
        Key: newName.replace(/\?/g, '/'),
        Body: file.url_private_download,
      };
      await s3.upload(params).promise();
      console.log("UPLOAD_SUCCESS ");
      logger.info({ source: constants.UPLOAD_SUCCESS, success: true });
    }));
    return filesKeys;
  } catch (error: any) {
    console.log('----- error in file response', error)
    logger.error({ source: constants.ERROR_EXTRACTING_FILES, msg: error });
    return [];
  }
}