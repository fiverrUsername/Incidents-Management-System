import React, { useEffect, useState } from 'react';
import { Grid, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import audio from '../../images/audio.png';
import pdf from '../../images/pdf.png';
import PowerPoint from '../../images/powerpoint.png';
import video from '../../images/video.png';
import word from '../../images/word.webp';
import excel from '../../images/excel.png';
import txt from '../../images/txt.png';
import attachmentService from '../../service/attachmentService';
import download from 'downloadjs';
import { log } from 'console';
import logo from '../../images/logo.png'

import { IAttachmentData } from '../../interface/timeLineInterface';
import { fileContainerStyle } from './attachment.style';
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
const getFileExtension = (fileName: string) => {
  const parts = fileName.split('.');
  if (parts.length > 1) {
    return parts[parts.length - 1].toLowerCase();
  }
  return '';
};
const getFileTypeFromData = (file: IAttachmentData) => {
  try {
    const parts = file.key.split('_');
    const fileNamePart = parts[parts.length - 1]; // Get the last part after the last underscore
    const extension = fileNamePart.split('.').pop()?.toLowerCase(); // Get the extension from the last part
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
export default function Attachment({
  file,
  onDelete,
  style,
}: {
  file: IAttachmentData;
  onDelete: (fileId: string) => void;
  style?: React.CSSProperties;
}) {
  const [fileType, setFileType] = useState<SupportedFileTypes>('default');

  useEffect(() => {
    setFileType(getFileTypeFromData(file));
  }, [file]);

  const renderGeneric = () => {
    return <p>Open {fileType}</p>;
  };

  const handleDelete = async () => {
    try {
      await attachmentService.deleteAttachment(file.key);
      onDelete(file.key);
    } catch (error) {
      console.error('Error deleting attachment:', error);
    }
  };

  const handleDownload = () => {
    download(file.data, file.key)
  };

  const renderFileContent = () => {
    if (!file) {
      return null;
    }
    if (fileType === 'image') {
      const imageType = getFileExtension(file.key);
      const imageData = `data:image/${imageType};base64,${file.data.toString('base64')}`;
      const imageContainerStyle: React.CSSProperties = {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '10px',
      };
      return (
        <div style={{ ...fileContainerStyle, ...style }}>
          <div style={imageContainerStyle}>
            <img src={imageData} alt="Attachment" style={{ maxWidth: '100%', maxHeight: '100%' }} />
          </div>
        </div>
      );
    }
    switch (fileType) {
      case 'pdf':
        return <img src={pdf} alt="pdf" />;
      case 'txt':
        return <img src={txt} alt="txt" />;
      case 'audio':
        return <img src={audio} alt="audio" />;
      case 'video':
        return <img src={video} alt="video" />;
      case 'word':
        return <img src={word} alt="word" />;
      case 'powerpoint':
        return <img src={PowerPoint} alt="powerpoint" />;
      case 'excel':
        return <img src={excel} alt="excel" />;
      default:
        return renderGeneric();
    }
  };
  return (
    <div style={{ ...fileContainerStyle, ...style }}>
      {renderFileContent()}
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <IconButton onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton onClick={handleDownload}>
            <DownloadIcon />
          </IconButton>
        </Grid>
      </Grid>
    </div>
  )
}