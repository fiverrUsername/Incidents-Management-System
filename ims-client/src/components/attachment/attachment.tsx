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
import txt from '../../images/txt.png';
import video from '../../images/video.png';
import word from '../../images/word.jpg';
import { IAttachmentData } from '../../interface/timeLineInterface';
import attachmentService from '../../service/attachmentService';
import { SingleAttachment, StyledFilePreview, StyledImage } from './attachment.style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

import {
  faFileWord,
  faFileAlt,
  faFileImage,
  faFileVideo,
  faFilePdf,
  faFilePowerpoint,
  // faFileMusic,
  faFileCode,
  faFileExcel,
  faFileAudio,
  faFile,
  faFileArchive,
} from '@fortawesome/free-solid-svg-icons';
import { Document, Page } from 'react-pdf';
const getFileName = (fileName: string) => {
  const parts = fileName.split('_');
  if (parts.length > 1) {
    const remainingString = parts[parts.length - 1];
    const trimmedString = remainingString.substring(13);
    return trimmedString;
  }
  return '';
};

export default function Attachment({
  fileType,
  file,
  onDelete,
  style,
}: {
  fileType: string
  file: string;
  onDelete: (fileId: string) => void;
  style?: React.CSSProperties;
}) {

  const [downloadUrl, setDownloadUrl] = useState<any>(null);


  const fetchDownloadUrl = async () => {
    try {
      const response = await attachmentService.getUrl(file);
      setDownloadUrl(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDownloadUrl()
  }, []);

  useEffect(() => {
    if (downloadUrl != null)
      renderFileContent()
  }, [downloadUrl]);

  // useEffect(() => {
  //   fileType=getFileTypeFromData(file);
  // }, []);

  // if (!downloadUrl) {
  //   return <div>Loading...</div>;
  // }


  const handleDelete = async () => {
    try {
      await attachmentService.deleteAttachment(file);
      onDelete(file);
    } catch (error) {
      console.error('Error deleting attachment:', error);
    }
  };

  const handleDownload = async () => {
    // const fileBlob = new Blob([file.data], { type: fileType });    
    // const fileURL = URL.createObjectURL(fileBlob);
    // // Create a download link
    // console.log(fileURL)
    let url: string;
    try {
      const response = await attachmentService.getUrl(file);
      setDownloadUrl(response);
      url = response;
      const downloadLink = document.createElement("a");
      downloadLink.href = url;
      downloadLink.download = file;
      downloadLink.click();
    } catch (error) {
      console.log(error);
    }

    // console.log(file.data)
    // download(file.data, getFileName(file.key))
  };

  // const renderImageContent = () => {
  //   const imageData = URL.createObjectURL(
  //     new Blob([file.data], { type: 'image/jpeg/png' })
  //   );
  //   return (
  //     <div>
  //       <img
  //         className="blob-to-image"
  //         src={imageData}
  //         title={getFileName(file.key)}
  //       />
  //       <p>{getFileName(file.key)}</p>
  //     </div>
  //   );
  // };


  type FileTypeStyle = {
    icon: IconDefinition;
    fontSize: string;
    marginBottom: string;
    marginLeft: string;
  };
  
  const fileTypeStyles: Record<string, FileTypeStyle> = {
    txt: { icon: faFileAlt, fontSize: '170px', marginBottom: '20px', marginLeft: '20px' },
    word: { icon: faFileWord, fontSize: '170px', marginBottom: '20px', marginLeft: '20px' },
    excel: { icon: faFileExcel, fontSize: '170px', marginBottom: '20px', marginLeft: '20px' },
  };
  
  
  
  const fileTypeMappings = {
    image: () => <StyledImage src={downloadUrl} width={100} title="File Viewer" />,
    pdf: () => (
      <div>
        <Document file={downloadUrl}>
          <Page pageNumber={1} />
        </Document>
      </div>
    ),
    audio: () => (
      <div className="audio-player">
        <audio controls>
          <source src={downloadUrl} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
    ),
    video: () => (
      <StyledFilePreview>
        <video controls>
          <source src={downloadUrl} type="video/mp4" />
        </video>
      </StyledFilePreview>
    ),
    default: () => (
      <div>
        <FontAwesomeIcon icon={faFile} title={getFileName(file)} style={{ color: '#2F854F', fontSize: '200px' }} />
      </div>
    ),
  } as Record<string, () => JSX.Element>; // Add this type assertion
  
  const renderFileContent = () => {
    if (fileType === 'image' && !downloadUrl) return null;
    if (!file) return null;
  
    if (fileTypeStyles[fileType]) {
      const { icon, fontSize, marginBottom, marginLeft } = fileTypeStyles[fileType];
      return (
        <div>
          <FontAwesomeIcon icon={icon} title={getFileName(file)} style={{ color: '#2F854F', fontSize, marginBottom, marginLeft }} />
        </div>
      );
    }
  
    if (['image', 'pdf', 'video'].includes(fileType)) {
      return (
        <StyledFilePreview>
          {fileTypeMappings[fileType]()}
        </StyledFilePreview>
      );
    }
    return (fileTypeMappings[fileType] || fileTypeMappings.default)();
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