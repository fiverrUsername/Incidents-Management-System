import React, { useEffect, useState } from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import ITimeLineEvent from '../../interface/timeLineInterface';
import Attachment from './attachment';
import apiCalls from '../../service/apiCalls';
import attachmentService from '../../service/awsService';

interface AttachmentlistProps {
  _id: string;
}
interface AttachmentData {
    key: string;
    data: Buffer;
}
const Attachmentlist: React.FC<AttachmentlistProps> = ({ _id }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [AllFilesData, setAllFilesData] = useState<(AttachmentData|null)[]>([]);
  const [FilesData, setFilesData] = useState<AttachmentData[]>([]);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % AllFilesData.length);
  };
//   const fetchTimelineData = async (id: string) => {
//     try {
//       const timelineData = await apiCalls.getTimeLineEventsById(id);
//       getFilesdata(timelineData);
//     } catch (error) {
//       console.error('Error Fetching Timeline Data:', error);
//     }
//   };
//   const getFilesdata = async (timeline: ITimeLineEvent) => {
//     try {
//       const response = await attachmentService.showAttachment(
//         timeline.files
//         // "incidence/649cbeda942a5d4d8bcf303f/CV - Ester Rot (1).docx",
//         // "sss",
//         // "incidence/undefined/111.jpg"
//       );
//       setFilesData((prevFilesData) => {
//         return [...prevFilesData, ...response];
//       });
//     } catch (error) {
//       console.error('Error Getting Data:', error);
//     }
//   };

const handleDownload = (bufferData:Buffer,fileName:string,mimeType:string) => {
    // Convert buffer data to Blob
    
    const fileBlob = new Blob([bufferData], { type: mimeType });
    // Create URL for Blob
    const fileURL = URL.createObjectURL(fileBlob);
    // Create a download link
    const downloadLink = document.createElement("a");
    downloadLink.href = fileURL;
    downloadLink.download = fileName;
    downloadLink.click();
  };

  const getFilesdata = async () => {
    try {
      const response = await attachmentService.showAttachment(
        [ 
            "incidence/649cbeda942a5d4d8bcf303f/CV - Ester Rot (1).docx",
            "sss",
            "incidence/undefined/111.jpg"
        ]
      );
      console.log("response",response);

      
      setAllFilesData((prevFilesData) => {
        console.log(response+"+++++++++++++++")
        return [...prevFilesData, ...response];
      })
      console.log("allData",AllFilesData);
      AllFilesData.map((file:AttachmentData|null)=>
        {
          console.log(response+"----------")
          if(file!=null)
            setFilesData(oldArray=>[...oldArray, file])
        }
      )
      console.log("Data",FilesData);

      // const bufferData = new Uint8Array([72, 101, 108, 108, 111, 33]);
      // const emptyBuffer = Buffer.alloc(0); 

      // handleDownload(filesData[0].data, filesData[0]?.key, "application/docx")
    } catch (error) {
      console.error('Error Getting Data:', error);
    }
  };
  useEffect(() => {
    getFilesdata()
    
  }, [FilesData])
  useEffect(() => {
    getFilesdata()
    
  }, [])
//   useEffect(() => {
//     fetchTimelineData(_id);
//   }, [_id]);
  return (
    <div>
      {/* <div style={{ display: 'flex', justifyContent: 'center' }}>
        {filesData && filesData.slice(currentIndex, currentIndex + 3).map((file, index) => (
          <Attachment file={file?.key} />
                 // <img
          //   key={index}
          //   src={image}
          //   alt={`Image ${index}`}
          //   style={{ width: '200px', height: '150px', marginRight: '10px' }}
          // />
        ))}
        {filesData && filesData.length > 3 && (
          <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <ArrowForwardIosIcon onClick={nextImage} />
          </div>
        )}
      </div> */}
    </div>
  );
};
export default Attachmentlist;