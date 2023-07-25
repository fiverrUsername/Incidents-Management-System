import axios from 'axios'

const baseUrl = process.env.REACT_APP_API_KEY

const awsCalls = {

    uploadAttachment:(forms:FormData[]) => axios.post(`${baseUrl}/aws`, forms, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then((response)=>response.data),
      
}

export default awsCalls