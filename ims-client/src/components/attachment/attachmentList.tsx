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

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % filesData.length);
  };

const getFileType = (file: string): SupportedFileTypes => {
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
    const parts = file.split('?');
    const remainingString = parts[0];
    const extension = remainingString.split('.').pop()?.toLowerCase();
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
    <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', flex: 3 }}>
      {filesDataUrl &&
        filesDataUrl.slice(currentIndex, currentIndex + 3).map((file, index) => (
          <Attachment
            fileType={getFileType(file)}
            key={index}
            file={file}
            onDelete={handleDeleteFile}
          />
        ))}
      {filesDataUrl && filesDataUrl.length > 3 && (
        <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          <ArrowForwardIosIcon onClick={nextImage} />
        </div>
      )}
    </div>
  );
}
export default Attachmentlist;