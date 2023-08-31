import axios from "axios";
import AWS from 'aws-sdk';
import FormData from 'form-data';
import fs from 'fs'

const s3 = new AWS.S3();

export async function fileResponse(files: any[], incidentId: string): Promise<string[]> {

  const filesKeys: string[] = [];
  const formData = new FormData();

  try {
    await Promise.all(files.map(async (file) => {
      try {
        const response = await axios.get(file.url_private_download, {
          headers: {
            Authorization: `Bearer ${process.env.SLACK_TOKEN}`,
          },
          responseType: "blob", // Use "arraybuffer" for binary data
          validateStatus: () => true,
        });

        const myFile = new Blob(
          [response.data],
          { type: file.filetype });

        const newName: string = `incidence?${incidentId}?${Date.now()}${file.name}`;

        filesKeys.push(newName);

        const params: AWS.S3.PutObjectRequest = {
          Bucket: 'ims-fiverr',
          Key: newName.replace(/\?/g, '/'),
          Body: new File([response.data], "docx") //myFile //Buffer.from(response.data)
        };
        console.log("##########################params.body", params.Body);
        await s3.upload(params).promise();
      } catch (error) {
        console.error("Error processing file:", error);
      }
    }));

    return filesKeys;

  } catch (error: any) {
    console.error("ERROR_EXTRACTING_FILES", error.message);
    return [];
  }
}