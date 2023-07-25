import axios from 'axios'

const baseUrl = process.env.REACT_APP_API_KEY



const awsService = {
  uploadAttachment: (forms: FormData) => axios.post(`${baseUrl}/aws`, forms, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }).then((response) => response.data),

  showAttachment: (files: string[]) => axios.get(`${baseUrl}/aws`, {
    params: { files }, 
  }).then((response) => response.data),

  deleteAttachment: (key: string) => axios.delete(`${baseUrl}/aws`, {
    params: { key },
  }).then((response) => response.data),
};

export default awsService;
