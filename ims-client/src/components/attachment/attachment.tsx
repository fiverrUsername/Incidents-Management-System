import { Grid, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import FileViewer from 'react-file-viewer';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import audio from '../../images/audio.png';
import pdf from '../../images/pdf.png';
import powerPoint from '../../images/powerPoint.png';
import video from '../../images/video.png';
import word from '../../images/word.webp';
import excel from '../../images/excel.png';
import awsService from '../../service/awsService';
type SupportedFileTypes =
  | 'image'
  | 'pdf'
  | 'audio'
  | 'video'
  | 'word'
  | 'powerpoint'
  | 'excel'
  | 'default';
const getFileTypeFromData = (file: string): SupportedFileTypes => {
  try {
    if (file.startsWith('data:')) {
      const mimeType = file.split(':')[1].split(';')[0];
      switch (mimeType) {
        case 'image/jpeg':
        case 'image/png':
        case 'image/gif':
          return 'image';
        case 'application/pdf':
          return 'pdf';
        case 'audio/mpeg':
        case 'audio/wav':
        case 'audio/ogg':
        case 'audio/mp3':
          return 'audio';
        case 'video/mp4':
        case 'video/mov':
        case 'video/wmv':
        case 'video/avi':
        case 'video/webm':
        case 'video/ogg':
          return 'video';
        case 'application/msword':
        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
          return 'word';
        case 'application/vnd.ms-powerpoint':
        case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
          return 'powerpoint';
        case 'application/vnd.ms-excel':
        case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
          return 'excel';
        default:
          return 'default';
      }
    } else if (file.endsWith('.pdf')) {
      return 'pdf';
    } else if (file.endsWith('.mp3') || file.endsWith('.wav') || file.endsWith('.ogg')) {
      return 'audio';
    } else if (file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.png') || file.endsWith('.gif')) {
      return 'image';
    } else if (file.endsWith('.doc') || file.endsWith('.docx') || file.endsWith('.odt') || file.endsWith('.txt')) {
      return 'word';
    } else if (file.endsWith('.mp4') || file.endsWith('.webm') || file.endsWith('.ogg')) {
      return 'video';
    } else if (file.endsWith('.ppt') || file.endsWith('.pptx')) {
      return 'powerpoint';
    } else if (file.endsWith('.xls') || file.endsWith('.xlsx')) {
      return 'excel';
    } else {
      return 'default';
    }
  } catch (error) {
    console.error('Error detecting file type:', error);
    return 'default';
  }
};
export default function Attachment({ file }: { file: string }) {
  const [fileType, setFileType] = useState<SupportedFileTypes>('default');
  useEffect(() => {
    setFileType(getFileTypeFromData(file));
  }, [file]);
  const renderGeneric = () => {
    return <p> Open {fileType}</p>;
  };
  const handleDelete = () => {
    awsService.deleteAttachment(file)
   // You must write a function that deletes the file visually in the client
    console.log('Deleting file:', file);
  };
  const handleDownload = () => {
    // Implement your logic to handle file download here
    console.log('Downloading file:', file);
  };
  const renderFileContent = () => {
    switch (fileType) {
      case 'image':
        return <img src={file} alt="Attachment" />;
      case 'pdf':
        return <img src={pdf} alt="pdf" />;
      case 'audio':
        return <img src={audio} alt="audio" />;
      case 'video':
        return <img src={video} alt="video" />;
      case 'word':
        return <img src={word} alt="word" />;
      case 'powerpoint':
        return <img src={powerPoint} alt="powerPoint" />;
      case 'excel':
        return <img src={audio} alt="audio" />;
      default:
        return (renderGeneric());
    }
  };
  return <div>{renderFileContent()}<Grid container spacing={2} alignItems="center">
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
</Grid></div>;
}