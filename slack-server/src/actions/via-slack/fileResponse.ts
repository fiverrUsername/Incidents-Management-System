import axios from "axios";

import FormData from 'form-data';
import { ERROR_EXTRACTING_FILES, IMS_SERVER_ROUTING } from "../../constPage";

export async function fileResponse(files: any[], incidentId: string): Promise<string[]> {
    const filesKeys: string[] = [];
    const formData = new FormData();
    try {
      await Promise.all(files.map(async (file) => {
        const response = await axios.get(file.url_private_download, {
          headers: {
            Authorization: `Bearer ${process.env.SLACK_TOKEN}`,
          },
          responseType: 'blob',
        });
        const newName = `incidence_${incidentId}_${Date.now()}${file.name}`;
        filesKeys.push(newName);
        formData.append('files', response.data, { filename: newName });
      }));
      await axios.post(`${IMS_SERVER_ROUTING}attachment`, formData, {
        headers: {
          ...formData.getHeaders(),
        },
      });
      return filesKeys;
    } catch (error: any) {
      console.error(ERROR_EXTRACTING_FILES, error.message);
      return [];
    }
  }