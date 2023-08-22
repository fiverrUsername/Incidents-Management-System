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
interface KeyUrlPair  {
  key: string;
  url: string;
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
  const [filesData, setFilesData] = useState<KeyUrlPair[]>([]);
  const filesToDisplay = 3
  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1));
  };
  const previousImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1));
  };

const getFileType = (key: string): SupportedFileTypes => {
  const extensionMap: Record<string, SupportedFileTypes> = {
    jpg: 'image',
    jpeg: 'image',
    png: 'image',
    gif: 'image',
    pdf: 'pdf',
    txt: 'txt',
    mp3: 'audio',
    wav: 'audio',
    ogg: 'audio',
    mpeg: 'audio',
    mp4: 'video',
    mov: 'video',
    wmv: 'video',
    avi: 'video',
    webm: 'video',
    doc: 'word',
    docx: 'word',
    odt: 'word',
    ppt: 'powerpoint',
    pptx: 'powerpoint',
    xls: 'excel',
    xlsx: 'excel',
    csv: 'excel',
  };

  try {
    const parts = key.split('?');
    const extension =parts[parts.length - 1].split('.').pop()?.toLowerCase();
    if (extension) {
      return extensionMap[extension] || 'default';
    } else {
      //A case where the key does not exist
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
      const signUrl:KeyUrlPair[]= await attachmentService.getUrls(timelineData.files);
      setFilesData(signUrl)
    } catch (error) {
      console.error('Error Fetching Timeline Data:', error);
    }
  };

  const handleDeleteFile = async (key: string) => {
    setFilesData((prevFiles) => prevFiles.filter((file) => file.key !==key))
    await apiCalls.deleteFileInTimeLine(id, key);
  };

  useEffect(() => {
    fetchTimelineData(id);
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', flex: 2, flexWrap: 'nowrap' }}>
      {filesData && filesData.length > filesToDisplay && currentIndex > 0 && (
        <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          <ArrowBackIosIcon onClick={previousImage} />
        </div>
      )}
      {filesData &&
        filesData.slice(currentIndex, currentIndex + filesToDisplay).map((file, index) => (
          <Attachment
            fileType={getFileType(file.key)}
            key={index}
            file={file}
            onDelete={handleDeleteFile}
          />
        ))}
      {filesData && filesData.length > filesToDisplay && currentIndex < (filesData.length - filesToDisplay) && (
        <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          <ArrowForwardIosIcon onClick={nextImage} />
        </div>
      )}
    </div>
  );
}
export default Attachmentlist;