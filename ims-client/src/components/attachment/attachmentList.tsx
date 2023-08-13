import React, { ReactNode, useEffect, useState } from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {ITimeLineEvent} from '../../interface/timeLineInterface';
import Attachment from './attachment';
import apiCalls from '../../service/apiCalls';
import attachmentService from '../../service/attachmentService';
import { log } from 'console';

interface AttachmentlistProps {
  id: string;
}
interface AttachmentData {
  key: string;
  data: Buffer;
}
const Attachmentlist: React.FC <AttachmentlistProps> = ({ id }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filesData, setFilesData] = useState<(AttachmentData)[]>([]);
  const [originalFilesData, setOriginalFilesData] = useState<(AttachmentData)[]>([]);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % filesData.length);
  };

  const fetchTimelineData = async (id: string) => {
    try {
      const timelineData:ITimeLineEvent = await apiCalls.getTimeLineEventsById(id)   
      console.log("timelineData    "+timelineData)
      getFilesdata(timelineData);
    } catch (error) {
      console.error('Error Fetching Timeline Data:', error);
    }
  };
  const getFilesdata = async (timeline: ITimeLineEvent) => {
    try {
      console.log("timeline   "+timeline)
      const response = await attachmentService.showAttachment(timeline.files)
      console.log('response  '+response);
      //filesData.push(response)
      setFilesData((prevFilesData) => {
        return [...prevFilesData, ...response];
      });
      console.log('filesData  '+filesData);
    } catch (error) {
      console.error('Error Getting Data:', error);
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
      <div style={{ display: 'flex', justifyContent: 'center' }}>
      {filesData && filesData.slice(currentIndex, currentIndex + 3).map((file,index) => (
          //eslint-disable-next-line react/jsx-key
          <Attachment key={index} file={file} onDelete={handleDeleteFile} />
          // eslint-disable-next-line react/jsx-key
          // <Attachment key={index} file={file}/>
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