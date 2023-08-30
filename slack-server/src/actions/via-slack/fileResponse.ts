import axios from "axios";

import FormData from 'form-data';
import { IMS_SERVER_ROUTING } from "../../constPage";
import logger from "../../loggers/log";
import { constants,files } from "../../loggers/constants";

export async function fileResponse(filesArr: any[], incidentId: string): Promise<string[]> {
    const filesKeys: string[] = [];
    const formData = new FormData();
    try {
      await Promise.all(filesArr.map(async (file) => {
        const response = await axios.get(file.url_private_download, {
          headers: {
            Authorization: `Bearer ${process.env.SLACK_TOKEN}`,
          },
          responseType: 'blob',
        });
        const newName = `incidence?${incidentId}?${Date.now()}${file.name}`;
        filesKeys.push(newName);
        formData.append('files', response.data, { filename: newName });
      }));
      try {
        await axios.post(`${IMS_SERVER_ROUTING}attachment`, formData, {
          headers: {
            ...formData.getHeaders(),
          },
        });
      } catch (error) {
         logger.error({ source: constants.AXIOS_ERROR_UPLOAD_FILES_TO_S3, file: files.FILERESPONSE , method: constants.METHOD.GET, error: error })
      }
      return filesKeys;
    } catch (error: any) {
      logger.error({ source: constants.AXIOS_ERROR_EXTRACTING_FILES, file: files.FILERESPONSE , method: constants.METHOD.GET, error: error })
      return [];
    }
  }