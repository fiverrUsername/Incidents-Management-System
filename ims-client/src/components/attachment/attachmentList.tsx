import React, { useEffect, useState } from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { ITimeLineEvent } from '../../interface/timeLineInterface';
import Attachment from './attachment';
import apiCalls from '../../service/apiCalls';
import attachmentService from '../../service/attachmentService';
import { json } from 'stream/consumers';
import { log } from 'console';
import { IAttachmentData } from '../../interface/timeLineInterface';
import { fileContainerStyle } from './attachment.style';
interface AttachmentlistProps {
  id: string;
}
const Attachmentlist: React.FC<AttachmentlistProps> = ({ id }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filesData, setFilesData] = useState<(IAttachmentData)[]>([]);
  const [originalFilesData, setOriginalFilesData] = useState<(IAttachmentData)[]>([]);
  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % filesData.length);
  };
  const fetchTimelineData = async (id: string) => {
    try {
      console.log("fetchTimelineData");
      const timelineData: ITimeLineEvent = await apiCalls.getTimeLineEventsById(id)
      getFilesdata(timelineData);
    } catch (error) {
      console.error('Error Fetching Timeline Data:', error);
    }
  };
  const getFilesdata = async (timeline: ITimeLineEvent) => {
    if (timeline.files.length > 0) {
      try {
        const response = await attachmentService.showAttachment(timeline.files)
        setFilesData((prevFilesData) => {
          return [...prevFilesData, ...response];
        });
      } catch (error) {
        console.error('Error Getting Data:', error);
      }
    }
  };

  const handleDeleteFile = async (fileKey: string) => {
    setOriginalFilesData((prevFiles) => prevFiles.filter((file) => file.key !== fileKey));
    setFilesData((prevFiles) => prevFiles.filter((file) => file.key !== fileKey));
    await apiCalls.deleteFileInTimeLine(id, fileKey);
  };

  useEffect(() => {
    fetchTimelineData(id);
  }, []);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>

        {filesData &&
          filesData.slice(currentIndex, currentIndex + 3).map((file) => (
            <Attachment
              key={file.key}
              file={file}
              onDelete={handleDeleteFile}
              style={fileContainerStyle}
            />
          ))}
        {filesData && filesData.length > 3 && (
          <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <ArrowForwardIosIcon onClick={nextImage} />
          </div>
        )}
      </div>
    </div>
  );
}
export default Attachmentlist;