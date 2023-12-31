import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import React, { useEffect, useState } from 'react';

import { ITimeLineEvent } from '../../../interfaces/ITimeLineEvent';
import Attachment from './attachment';
import backendServices from '../../../services/backendServices/backendServices';
import attachmentServices from '../../../services/backendServices/attachmentServices';
import Logger from '../../../loggers/logger';
interface AttachmentlistProps {
  id: string;
  files: string[];
}
interface KeyUrlPair {
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
  | 'code'
  | 'default';
const Attachmentlist: React.FC<AttachmentlistProps> = ({ id, files }) => {
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
      c: 'code',
      cpp: 'code',
      java: 'code',
      py: 'code',
      js: 'code',
      jsx: 'code',
      ts: 'code',
      html: 'code',
      css: 'code',
      sql: 'code',
      rb: 'code',
      php: 'code',
      swift: 'code',
      go: 'code',
      R: 'code',
      pl: 'code',
      kt: 'code',
      scala: 'code',
      rs: 'code',
      dart: 'code',
      json: 'code',
    };

    try {
      const parts = key.split('?');
      const extension = parts[parts.length - 1].split('.').pop()?.toLowerCase();
      if (extension) {
        return extensionMap[extension] || 'default';
      } else {
        //A case where the key does not exist
        return 'default';
      }
    } catch (error) {
      console.error('Error detecting file type:', error);
      Logger.error({ source: "Attachment list", message: "Error detecting file type\t Key:" + key + "\tIncidentId: \t" + id });
      return 'default';
    }
  };

  const fetchTimelineData = async (id: string) => {
    try {
      // const timelineData: ITimeLineEvent = await backendServices.getTimeLineEventsById(id)
      const signUrl: KeyUrlPair[] = await attachmentServices.getUrls(files);
      Logger.info({ source: "Attachment list", message: "Fetching urls files by attachment success!" })
      setFilesData(signUrl)
    } catch (error) {
      Logger.error({ source: "Attachment list", message: "Error fetching urls files by attachment." })
      console.error('Error Fetching Timeline Data:', error);
    }
  };

  const handleDeleteFile = async (key: string) => {
    setFilesData((prevFiles) => prevFiles.filter((file) => file.key !== key))
    try {
      await backendServices.deleteFileInTimeLine(id, key);
      Logger.info({ source: "Attachment list", message: "Delete file in timeline by id & key success!\t Id:" + id + "\t Key:" + key })
    } catch (error) {
      Logger.error({ source: "Attachment list", message: "Error Delete file in timeline by id & key\t Id:" + id + "\t Key:" + key })
    }
  };

  useEffect(() => {
    fetchTimelineData(id);
  }, [id, files]);


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