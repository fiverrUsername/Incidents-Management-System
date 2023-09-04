// import axios from "axios";
// import AWS from 'aws-sdk';
// import fs from "fs";
// import path from "path";
// import logger from "../../loggers/log";
// import { constants } from "../../loggers/constants";

// const s3 = new AWS.S3({
//   region: process.env.AWS_REGION,
// });
// AWS.config.getCredentials(function(err) {
//   if (err) console.log(err.stack);
//   // credentials not loaded
//   else {
//     logger.info({ source: constants.ACCESS_KEY, msg: AWS.config.credentials?.accessKeyId, success: true });
//     console.log("Access key:", AWS.config.credentials?.accessKeyId);
//   }
// });

// export async function fileResponse(files: any[], incidentId: string): Promise<string[]> {
//   const filesKeys: string[] = [];
//   try {
//     await Promise.all(files.map(async (file) => {
//       try {
//         const response = await axios.get(file.url_private_download, {
//           headers: {
//             Authorization: `Bearer ${process.env.SLACK_TOKEN}`,
//           },
//           responseType: 'arraybuffer', // Use "arraybuffer" for binary data
//           validateStatus: () => true,
//         });
        
//         const newName: string = `incidence?${incidentId}?${Date.now()}${file.name}`;
//         const filePath = path.join('/tmp', newName);
//         fs.writeFileSync(filePath, response.data); 
//         // const bufferData: Buffer = Buffer.from(response.data, 'binary'); // Convert binary data to Buffer        console.log("-----------newName ",newName)
//         filesKeys.push(newName);
//         const params: AWS.S3.PutObjectRequest = {
//           Bucket: 'ims-fiverr',
//           Key: newName.replace(/\?/g, '/'),
//           // Body: new File([response.data], "docx") //myFile //Buffer.from(response.data)
//           Body: fs.readFileSync(filePath), // Read the file from disk
//         };
//         console.log("##########################params.body", params.Body);
//         await s3.upload(params).promise();
//         console.log("UPLOAD_SUCCESS ")
//         fs.unlinkSync(filePath);
//         logger.info({ source: constants.UPLOAD_SUCCESS, success: true });
//       } catch (error) {
//         logger.error({ source: constants.UPLOAD_FAILED, msg: error});
//         console.error("Error processing file:", error);
//       }
//     }));
//     return filesKeys;
//   } catch (error: any) {
//     logger.error({ source: constants.ERROR_EXTRACTING_FILES, msg: error });
//     return [];
//   }
// }

import axios from "axios";
import AWS from 'aws-sdk';
import fs from "fs";
import path from "path";
import logger from "../../loggers/log";
import { constants } from "../../loggers/constants";
import fi from "date-fns/locale/fi";

const s3 = new AWS.S3({
  region: process.env.AWS_REGION,
});
AWS.config.getCredentials(function (err) {
  if (err) console.log(err.stack);
  // credentials not loaded
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
      console.log('------before new blob')
      // const myBlob = new Blob([file.url_private_download, { type: 'application/docx' }]);
      console.log('------after new blob')
      filesKeys.push(newName);
      const params: AWS.S3.PutObjectRequest = {
        Bucket: 'ims-fiverr',
        Key: newName.replace(/\?/g, '/'),
        Body: file.url_private_download,
      };
      console.log("##########################params.body", params);
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
