import { Grid, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import FileViewer from 'react-file-viewer';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import audio from '../../images/audio.png';
import pdf from '../../images/pdf.png';
import powerPoint from '../../images/powerPoint.png';
import video from '../../images/video.png';
import word from '../../images/word.png';
import excel from '../../images/excel.png';
import txt from '../../images/txt.jpg';
import attachmentService from '../../service/attachmentService';
import { log } from 'console';
import logo from '../../images/logo.png'
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

 interface AttachmentData {
    key: string;
    data: Buffer;
}
const getFileTypeFromData = (file: AttachmentData)  => {
  try {
    if (file.key.startsWith('data:')) {
      const mimeType = file.key.split(':')[1].split(';')[0];
      switch (mimeType) {
        case 'image/jpeg':
        case 'image/png':
        case 'image/gif':
          return 'image';
        case 'application/pdf':
          return 'pdf';
        case 'application/txt':
          return 'txt';
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
        case 'text.csv':
        case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
          return 'excel';
        default:
          return 'default';
      }
    } else if (file.key.endsWith('.pdf')) {
      return 'pdf';
    }else if (file.key.endsWith('.txt')) {
        return 'txt';
    } else if (file.key.endsWith('.mp3') || file.key.endsWith('.wav') || file.key.endsWith('.ogg')) {
      return 'audio';
    } else if (file.key.endsWith('.jpg') || file.key.endsWith('.jpeg') || file.key.endsWith('.png') || file.key.endsWith('.gif')) {
      return 'image';
    } else if (file.key.endsWith('.doc') || file.key.endsWith('.docx') || file.key.endsWith('.odt') || file.key.endsWith('.txt')) {
      return 'word';
    } else if (file.key.endsWith('.mp4') || file.key.endsWith('.webm') || file.key.endsWith('.ogg')) {
      return 'video';
    } else if (file.key.endsWith('.ppt') || file.key.endsWith('.pptx')) {
      return 'powerpoint';
    } else if (file.key.endsWith('.xls') || file.key.endsWith('.xlsx')|| file.key.endsWith('.csv')) {
      return 'excel';
    } else {
      return 'default';
    }
  } catch (error) {
    console.error('Error detecting file type:', error);
    return 'default';
  }
};
export default function Attachment({ file,  }: { file: AttachmentData }) {
  const [fileType, setFileType] = useState<SupportedFileTypes>('default');
  useEffect(() => {
    setFileType(getFileTypeFromData(file));
  }, [file]);
  const renderGeneric = () => {
    return <p> Open {fileType}</p>;
  };
  // const handleDelete = async () => {
  //   try {
  //     await attachmentService.deleteAttachment(file.key);
  //     onDelete(file);
  //   } catch (error) {
  //     console.error('Error deleting attachment:', error);
  //   }
  // };
  const handleDownload = () => {
    // Convert buffer data to Blob
    const fileBlob = new Blob([file.data], { type: fileType });
    // Create URL for Blob
    const fileURL = URL.createObjectURL(fileBlob);
    // Create a download link
    const downloadLink = document.createElement("a");
    downloadLink.href = fileURL;
    downloadLink.download = file.key;
    downloadLink.click();
  };
  const renderFileContent = () => {
    if (!file) {
      return null;
    }
    if (fileType === 'image' && (file.key.endsWith('.jpg') ||
        file.key.endsWith('.jpeg') || file.key.endsWith('.png') || file.key.endsWith('.gif'))) {
         return <img src={file.key} alt="Attachment" />;
    }
    switch (fileType) {
      case 'pdf':
        return <img src={logo} alt="pdf" />;
      case 'txt':
        return <img src={logo} alt="txt" />;
      case 'audio':
        return <img src={logo} alt="audio" />;
      case 'video':
        return <img src={logo} alt="video" />;
      case 'word':
        return <img src={logo} alt="word" />;
      case 'powerpoint':
        return <img src={logo} alt="powerPoint" />;
      case 'excel':
        return <img src={logo} alt="excel" />;
      default:
        return renderGeneric();
    }
  };
  return <div>{renderFileContent()}<Grid container spacing={2} alignItems="center">
  {/* <Grid item>
    <IconButton onClick={handleDelete}>
      <DeleteIcon />
    </IconButton>
  </Grid> */}
  <Grid item>
    <IconButton onClick={handleDownload}>
      <DownloadIcon />
    </IconButton>
  </Grid>
</Grid></div>;
}







