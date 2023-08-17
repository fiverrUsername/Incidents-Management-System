import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import React, { useEffect, useState } from 'react';
import { IAttachmentData, ITimeLineEvent } from '../../interface/timeLineInterface';
import apiCalls from '../../service/apiCalls';
import attachmentService from '../../service/attachmentService';
import Attachment from './attachment';
interface AttachmentlistProps {
  id: string;
}
const Attachmentlist: React.FC<AttachmentlistProps> = ({ id }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filesData, setFilesData] = useState<(string)[]>([]);
  const [originalFilesData, setOriginalFilesData] = useState<(string)[]>([]);
  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % filesData.length);
  };
  const fetchTimelineData = async (id: string) => {
    try {
      const timelineData: ITimeLineEvent = await apiCalls.getTimeLineEventsById(id)
      setFilesData(timelineData.files)
      // getFilesdata(timelineData);
    } catch (error) {
      console.error('Error Fetching Timeline Data:', error);
    }
  };
  // const getFilesdata = async (timeline: ITimeLineEvent) => {
  //   if (timeline.files.length > 0) {
  //     try {
  //       const response = await attachmentService.showAttachment(timeline.files)
  //       setFilesData((prevFilesData) => {
  //         return [...prevFilesData, ...response];
  //       });
  //       console.log("response",response);
  //     } catch (error) {
  //       console.error('Error Getting Data:', error);
  //     }
  //   }
  // };

  const handleDeleteFile = async (fileKey: string) => {
    setOriginalFilesData((prevFiles) => prevFiles.filter((file) => file!== fileKey));
    setFilesData((prevFiles) => prevFiles.filter((file) => file!== fileKey));
    await apiCalls.deleteFileInTimeLine(id, fileKey);
  };

  useEffect(() => {
    fetchTimelineData(id);
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', flex: 3 }}>
      {filesData &&
        filesData.slice(currentIndex, currentIndex + 3).map((file,index) => (
          <Attachment
            key={index}
            file={file}
            onDelete={handleDeleteFile}
          />
        ))}
      {filesData && filesData.length > 3 && (
        <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          <ArrowForwardIosIcon onClick={nextImage} />
        </div>
      )}
    </div>
  );
}
export default Attachmentlist;