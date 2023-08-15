import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import { Grid, IconButton } from '@mui/material';
import download from 'downloadjs';
import React, { useEffect, useState } from 'react';
import audio from '../../images/audio.png';
import excel from '../../images/excel.png';
import logo from '../../images/logo.png';
import pdf from '../../images/pdf.png';
import PowerPoint from '../../images/powerPoint.png';
import txt from '../../images/txt.jpg';
import video from '../../images/video.png';
import word from '../../images/word.jpg';
import { IAttachmentData } from '../../interface/timeLineInterface';
import attachmentService from '../../service/attachmentService';
import { SingleAttachment, StyledImage } from './attachment.style';

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
    const remainingString = parts[parts.length - 1];
    const trimmedString = remainingString.substring(13);
    return trimmedString;
  }
  return '';
};

const getFileTypeFromData = (file: IAttachmentData) => {
  try {
    const extension = getFileName(file.key).split('.').pop()?.toLowerCase();
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

  const handleDelete = async () => {
    try {
      await attachmentService.deleteAttachment(file.key);
      onDelete(file.key);
    } catch (error) {
      console.error('Error deleting attachment:', error);
    }
  };

  const handleDownload = () => {
    // const fileBlob = new Blob([file.data], { type: fileType });    
    // const fileURL = URL.createObjectURL(fileBlob);
    // // Create a download link
    // console.log(fileURL)
    // const downloadLink = document.createElement("a");
    // downloadLink.href = fileURL;
    // downloadLink.download = file.key;
    // downloadLink.click();
    // console.log(file.data)
    download(file.data, getFileName(file.key))
  };

  const renderImageContent = () => {
    const imageData = URL.createObjectURL(
      new Blob([file.data], { type: 'image/jpeg/png' })
    );
    return (
      <div>
        <img
          className="blob-to-image"
          src={imageData}
          title={getFileName(file.key)}
        />
        <p>{getFileName(file.key)}</p>
      </div>
    );
  };


  const renderFileContent = () => {
    if (!file) {
      return null;
    }
    switch (fileType) {
      case 'image':
        return renderImageContent();
      case 'pdf':
        return <img src={pdf} alt="pdf" title={getFileName(file.key)} />;
      case 'txt':
        return <StyledImage src={txt} alt="txt" title={getFileName(file.key)} />;
      case 'audio':
        return <StyledImage src={audio} alt="audio" title={getFileName(file.key)} />;
      case 'video':
        return <StyledImage src={video} alt="video" title={getFileName(file.key)} />;
      case 'word':
        return <StyledImage src={word} alt="word" title={getFileName(file.key)} />;
      case 'powerpoint':
        return <StyledImage src={PowerPoint} alt="powerPoint" title={getFileName(file.key)} />;
      case 'excel':
        return <StyledImage src={excel} alt="excel" title={getFileName(file.key)} />;
      default:
        return <StyledImage src={logo} alt="default" title={getFileName(file.key)} />;
    }
  };
  return (
    <SingleAttachment>
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
    </SingleAttachment>
  )
}