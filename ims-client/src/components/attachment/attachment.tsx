import { Grid, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import FileViewer from 'react-file-viewer';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import AwsService from '../../service/attachmentService'
interface AttachmentData {
  key: string;
  data: Buffer;
}


type SupportedFileTypes =
  | 'image'
  | 'pdf'
  | 'audio'
  | 'video'
  | 'word'
  | 'powerpoint'
  | 'excel'
  | 'default';
  const [filesKey, setFilesKey] = useState<AttachmentData[]>([]);

  const getAttachment = async (files: string[]) => {
    try {
      const attachment = await AwsService.showAttachment(files);
      setFilesKey(attachment);
    } catch (error) {
      console.error(error)
    }
  };
  
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
    AwsService.deleteAttachment(file)
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
        return <FileViewer fileType={fileType} filePath={file} />;
      case 'audio':
        return (
          <audio controls>
            <source src={file} type={`audio/${file.split('.').pop()?.toLowerCase()}`} />
            Your browser does not support the audio element.
          </audio>
        );
      case 'video':
        return (
          <video controls>
            <source src={file} type={`video/${file.split('.').pop()?.toLowerCase()}`} />
            Your browser does not support the video element.
          </video>
        );
      case 'word':
        return (
          <a href={file} target="_blank" rel="noopener noreferrer">
            Open Word Document
          </a>
        );
      case 'powerpoint':
        return (
          <a href={file} target="_blank" rel="noopener noreferrer">
            Open PowerPoint Presentation
          </a>
        );
      case 'excel':
        return (
          <a href={file} target="_blank" rel="noopener noreferrer">
            Open Excel Spreadsheet
          </a>
        );
      default:
        return (
          <>
            <p>Open {fileType}</p>
            
          </>
        );
    }
  };

  // const DownloadAttachment = () =>{

  // }

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
