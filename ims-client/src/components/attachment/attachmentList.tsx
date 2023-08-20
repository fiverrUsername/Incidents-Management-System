import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import React, { useEffect, useState } from 'react';
import { IAttachmentData, ITimeLineEvent } from '../../interface/timeLineInterface';
import apiCalls from '../../service/apiCalls';
import attachmentService from '../../service/attachmentService';
import Attachment from './attachment';
interface AttachmentlistProps {
  id: string;
}
type SupportedFileTypes =
  | 'image'
  | 'pdf'
  | 'audio'
  | 'video'
  | 'word'
  | 'powerpoint'
  | 'excel'
  | 'txt'
  | 'default';
const Attachmentlist: React.FC<AttachmentlistProps> = ({ id }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filesData, setFilesData] = useState<(string)[]>([]);
  const [filesDataUrl, setFilesDataUrl] = useState<(string)[]>([]);

  const [originalFilesData, setOriginalFilesData] = useState<(string)[]>([]);
  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % filesData.length);
  };
  const getFileType = (file: string) => {
    try {
      const parts = file.split('?');
      const remainingString = parts[0];
      const extension = remainingString.split('.').pop()?.toLowerCase();
      switch (extension) {
        case 'jpg':
        case 'jpeg':
        case 'png':
        case 'gif':
          return 'image';
        case 'pdf':
          return 'pdf';
        case 'txt':
          return 'txt';
        case 'mp3':
        case 'wav':
        case 'ogg':
        case 'mpeg':
          return 'audio';
        case 'mp4':
        case 'mov':
        case 'wmv':
        case 'avi':
        case 'webm':
          return 'video';
        case 'doc':
        case 'docx':
        case 'odt':
          return 'word';
        case 'ppt':
        case 'pptx':
          return 'powerpoint';
        case 'xls':
        case 'xlsx':
        case 'csv':
          return 'excel';
        default:
          return 'default';
      }
    } catch (error) {
      console.error('Error detecting file type:', error);
      return 'default';
    }
  };
  const fetchTimelineData = async (id: string) => {
    try {
      const timelineData: ITimeLineEvent = await apiCalls.getTimeLineEventsById(id)
      setFilesData(timelineData.files)
      const signUrl:string[]= await attachmentService.getUrls(timelineData.files);
      setFilesDataUrl(signUrl)
    } catch (error) {
      console.error('Error Fetching Timeline Data:', error);
    }
  };
  
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
      {filesDataUrl &&
        filesDataUrl.slice(currentIndex, currentIndex + 3).map((file,index) => (
          <Attachment
            fileType={getFileType(file)}
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