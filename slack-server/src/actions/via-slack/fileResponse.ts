import axios from "axios";
import { SLACK_TOKEN } from "../../const";
import FormData from 'form-data';

export async function fileResponse(files: any[], incidentId: string): Promise<string[]> {
    const filesKeys: string[] = [];
    const formData = new FormData();
    try {
      await Promise.all(files.map(async (file) => {
        const response = await axios.get(file.url_private_download, {
          headers: {
            Authorization: `Bearer ${SLACK_TOKEN}`,
          },
          responseType: 'blob',
        });
        const newName = `incidence_${incidentId}_${Date.now()}${file.name}`;
        filesKeys.push(newName);
        formData.append('files', response.data, { filename: newName });
      }));
      await axios.post('http://localhost:7000/attachment', formData, {
        headers: {
          ...formData.getHeaders(),
        },
      });
      return filesKeys;
    } catch (error: any) {
      console.error('Error extracting files:', error.message);
      return [];
    }
  }