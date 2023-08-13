import { Grid, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import audio from '../../images/audio.png';
import pdf from '../../images/pdf.png';
import PowerPoint from '../../images/powerPoint.png';
import video from '../../images/video.png';
import word from '../../images/word.webp';
import excel from '../../images/excel.png';
import txt from '../../images/txt.png';
import attachmentService from '../../service/attachmentService';
import download from 'downloadjs';
import { log } from 'console';

// Define the supported file types
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

// Define the data structure for an attachment
interface AttachmentData {
  key: string;
  data: Buffer;
}

// Helper function to get the file type from the attachment data
const getFileTypeFromData = (file: AttachmentData) => {
  console.log('-----------------'+file.key);
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
        case 'text/csv':
        case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
          return 'excel';
        default:
          return 'default';
      }
    } else
// else
     if (file.key.endsWith('.pdf')) {
      return 'pdf';
    } else if (file.key.endsWith('.txt')) {
      return 'txt';
    } else if (file.key.endsWith('.mp3') || file.key.endsWith('.wav') || file.key.endsWith('.ogg')) {
      return 'audio';
    } else if (file.key.endsWith('.jpg') || file.key.endsWith('.jpeg') || file.key.endsWith('.png') || file.key.endsWith('.gif')) {
      console.log('png');   
      return 'image';
    } else if (file.key.endsWith('.doc') || file.key.endsWith('.docx') || file.key.endsWith('.odt') || file.key.endsWith('.txt')) {
      console.log('word');
      return 'word';
    } else if (file.key.endsWith('.mp4') || file.key.endsWith('.webm') || file.key.endsWith('.ogg')) {
      return 'video';
    } else if (file.key.endsWith('.ppt') || file.key.endsWith('.pptx')) {
      return 'powerpoint';
    } else if (file.key.endsWith('.xls') || file.key.endsWith('.xlsx') || file.key.endsWith('.csv')) {
      return 'excel';
    } else {
      return 'default';
    }
  } catch (error) {
    console.error('Error detecting file type:', error);
    console.log('errrr');
    return 'default';
  }
};

  export default function Attachment({ file, onDelete }: { file: AttachmentData, onDelete: (fileId: string) => void }) {
  const [fileType, setFileType] = useState<SupportedFileTypes>('default');
  // Update the file type when the attachment data changes
  useEffect(() => {
    setFileType(getFileTypeFromData(file));
  }, [file]);

  // Render the generic file content
  const renderGeneric = () => {
    return <p>Open {fileType}</p>;
  };

  // Handle delete button click
  const handleDelete = async () => {
    try {
      await attachmentService.deleteAttachment(file.key);
      onDelete(file.key);
    } catch (error) {
      console.error('Error deleting attachment:', error);
    }
  };

  // Handle download button click
  const handleDownload = () => {
    // // Convert buffer data to Blob
    // console.log("fileType",fileType)
    // const fileBlob = new Blob([file.data], { type: fileType });
    // console.log("fileBlob", fileBlob)
    // // Create URL for Blob
    // const fileURL = URL.createObjectURL(fileBlob);
    // // Create a download link
    // const downloadLink = document.createElement("a");
    // downloadLink.href = fileURL;
    // downloadLink.download = file.key;
    // downloadLink.click();
    console.log(file.data)
    download(file.data, file.key)
  };

  // Render the file content based on the file type
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
        return <img src={PowerPoint} alt="powerPoint" />;
      case 'excel':
        return <img src={excel} alt="excel" />;
      default:
        return renderGeneric();
    }
  };

  // Render the attachment component
  return (
   <div>
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
  );
}
