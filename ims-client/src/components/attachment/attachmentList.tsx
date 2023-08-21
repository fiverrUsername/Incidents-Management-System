import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import React, { useEffect, useState } from 'react';

import { ITimeLineEvent } from '../../interface/timeLineInterface';
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
  const filesToDisplay = 3
  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1));
  };
  const previousImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1));
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
      const signUrl: string[] = await attachmentService.getUrls(timelineData.files);
      setFilesDataUrl(signUrl)
    } catch (error) {
      console.error('Error Fetching Timeline Data:', error);
    }
  };

  const handleDeleteFile = async (fileKey: string) => {
    const key: string = fileKey.split('?')[0].substring(36, fileKey.length).replace(/\//g, "_");
    setFilesData((prevFiles) => prevFiles.filter((file) => file !== key));
    setFilesDataUrl((prevFiles) => prevFiles.filter((file) => file !== fileKey))
    await apiCalls.deleteFileInTimeLine(id, key);
  };

  useEffect(() => {
    fetchTimelineData(id);
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', flex: 2, flexWrap: 'nowrap' }}>
      {filesDataUrl && filesDataUrl.length > filesToDisplay && currentIndex > 0 && (
        <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          <ArrowBackIosIcon onClick={previousImage} />
        </div>
      )}
      {filesDataUrl &&
        filesDataUrl.slice(currentIndex, currentIndex + filesToDisplay).map((file, index) => (
          <Attachment
            fileType={getFileType(file)}
            key={index}
            file={file}
            onDelete={handleDeleteFile}
          />
        ))}
      {filesDataUrl && filesDataUrl.length > filesToDisplay && currentIndex < (filesDataUrl.length - filesToDisplay) && (
        <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          <ArrowForwardIosIcon onClick={nextImage} />
        </div>
      )}
    </div>
  );
}
export default Attachmentlist;