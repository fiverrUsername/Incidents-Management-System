import React, { useEffect, useState } from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import awsService from '../../service/awsService';
import ITimeLineEvent from '../../interface/timeLineInterface';
import Attachment from './attachment';
import apiCalls from '../../service/apiCalls';
import { buffer } from 'stream/consumers';

interface AttachmentlistProps {
  _id: string;
}

interface AttachmentData {
  key: string;
  data: Buffer;
}
const Attachmentlist: React.FC<AttachmentlistProps> = ({ _id }) => {
  const [files, setFiles] = useState<string[]>(["incidence/649cbeda942a5d4d8bcf303b/Doc1.docx", ""])
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filesData, setFilesData] = useState<(AttachmentData | null)[]>([]);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % filesData.length);
  };

  const fetchTimelineData = async (id: string) => {
    try {
      const timelineData = await apiCalls.getTimeLineEventById(id);
      getFilesdata(timelineData);
    } catch (error) {
      console.error('Error Fetching Timeline Data:', error);
    }
  };

  const getFilesdata = async (timeline: ITimeLineEvent) => {
    try {
      const response = await awsService.showAttachment([
        "incidence/649cbeda942a5d4d8bcf303f/CV - Ester Rot (1).docx",
        "sss",
        "incidence/undefined/111.jpg"
      ]);
      console.log("response############3", response[0].data.data);
      setFilesData((prevFilesData) => {
        return [...prevFilesData, ...response];
      });
      console.log(filesData);
    } catch (error) {
      console.error('Error Getting Data:', error);
    }
  };

  useEffect(() => {
    fetchTimelineData(_id);
  }, [_id]);

  const fileKeys = filesData;

  return (
    <div>
      {/* <div style={{ display: 'flex', justifyContent: 'center' }}>
        {filesData && filesData.slice(currentIndex, currentIndex + 3).map((file, index) => (
        //   <Attachment key={index} file={file} />
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