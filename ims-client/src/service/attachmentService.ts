import axios from 'axios'
const baseUrl = process.env.REACT_APP_API_KEY

const attachmentService = {
  uploadAttachment: (forms: FormData) => axios.post(`${baseUrl}/attachment`, forms, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }).then((response) => response.data),

 getUrls:(keys:string[])=>axios.post(`${baseUrl}/attachment/allSingUrl`,keys).then((response)=>
 response.data
 ),

  deleteAttachment: (key: string) => axios.delete(`${baseUrl}/attachment`, {
    params: { key }
  }).then((response) => response.data),
};
export default attachmentService;