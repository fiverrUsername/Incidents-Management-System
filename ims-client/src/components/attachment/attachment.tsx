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

const getFileName = (fileName: string) => {
  const parts = fileName.split('_');
  if (parts.length > 1) {
    return parts[parts.length - 1];
  }
  return '';
};

const getFileTypeFromData = (file: IAttachmentData) => {
  try {
    const parts = file.key.split('_');
    const fileNamePart = parts[parts.length - 1]; 
    const extension = fileNamePart.split('.').pop()?.toLowerCase(); 
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
<<<<<<< HEAD

=======
>>>>>>> e577043f8e815c58faa46a9d8e4cc602c1c60d79
  useEffect(() => {
    setFileType(getFileTypeFromData(file));
  }, [file]);

<<<<<<< HEAD
  const renderGeneric = () => {
    return <p>Open {fileType}</p>;
  };

=======
>>>>>>> e577043f8e815c58faa46a9d8e4cc602c1c60d79
  const handleDelete = async () => {
    try {
      await attachmentService.deleteAttachment(file.key);
      onDelete(file.key);
    } catch (error) {
      console.error('Error deleting attachment:', error);
    }
  };

  const handleDownload = () => {
<<<<<<< HEAD
=======
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
>>>>>>> e577043f8e815c58faa46a9d8e4cc602c1c60d79
    download(file.data, file.key)
  };

  const renderFileContent = () => {
    if (!file) {
      return null;
    }
    switch (fileType) {
      case 'image':
        return (
          <div>
           <img src={`data:image/${fileType};base64,${file.data.toString('base64')}`} alt="image" title={getFileName(file.key)}/>;
            <p>{getFileName(file.key)}</p>
          </div>
        );
      case 'pdf':
        return (
          <div>
            <img src={pdf} alt="pdf" title={getFileName(file.key)} />
            <p>{getFileName(file.key)}</p>
          </div>
        );
      case 'txt':
        return (
          <div>
            <img src={txt} alt="txt" title={getFileName(file.key)} />
            <p>{getFileName(file.key)}</p>
          </div>
        );
      case 'audio':
<<<<<<< HEAD
        return <img src={audio} alt="audio" />;
=======
        return (
          <div>
            <img src={audio} alt="audio" title={getFileName(file.key)} />
            <p>{getFileName(file.key)}</p>
          </div>
        );
>>>>>>> e577043f8e815c58faa46a9d8e4cc602c1c60d79
      case 'video':
        return (
          <div>
            <img src={video} alt="video" title={getFileName(file.key)} />
            <p>{getFileName(file.key)}</p>
          </div>
        );
      case 'word':
<<<<<<< HEAD
        return <img src={word} alt="word" />;
      case 'powerpoint':
        return <img src={PowerPoint} alt="powerpoint" />;
      case 'excel':
        return <img src={excel} alt="excel" />;
=======
        return (
          <div>
            <img src={word} alt="word" title={getFileName(file.key)} />
            <p>{getFileName(file.key)}</p>
          </div>
        );
      // case 'powerpoint':
      //   return (
      //     <div>
      //       <img src={PowerPoint} alt="powerpoint" title={getFileName(file.key)} />;
      //       <p>{getFileName(file.key)}</p>
      //     </div>
      //   );
      case 'excel':
        return (
          <div>
            <img src={excel} alt="excel" title={getFileName(file.key)} />;
            <p>{getFileName(file.key)}</p>
          </div>
        );
>>>>>>> e577043f8e815c58faa46a9d8e4cc602c1c60d79
      default:
        return (
          <div>
            
            <img src={logo} alt="default" title={getFileName(file.key)} />;
            <p>{getFileName(file.key)}</p>
          </div>
        );
    }
<<<<<<< HEAD
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
=======


  
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
>>>>>>> e577043f8e815c58faa46a9d8e4cc602c1c60d79
}