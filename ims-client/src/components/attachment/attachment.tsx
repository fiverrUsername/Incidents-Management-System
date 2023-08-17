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
import { SingleAttachment, StyledImage } from './attachment.style';

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
  fileType:string
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
   if(downloadUrl!=null)
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
    try {
      const response = await attachmentService.getUrl(file);

      setDownloadUrl(response);
    } catch (error) {
      console.log(error);
    }
    const downloadLink = document.createElement("a");
    downloadLink.href = downloadUrl;
    downloadLink.download = file;
    downloadLink.click();
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


  const renderFileContent = () => {
    
    if(!downloadUrl)
      return null;
    if (!file) {
      return null;
    }
    console.log("fileType",fileType);
    switch (fileType) {
      case 'image':
        // return renderImageContent();
      // return  <a href={downloadUrl} download>
      //   Download File
      // </a>;
      return <iframe src={downloadUrl} width="100%" height="500px" title="File Viewer" />
      case 'pdf':
        return <img src={pdf} alt="pdf" title={getFileName(file)} />;
      case 'txt':
        return <StyledImage src={txt} alt="audio" title={getFileName(file)} />;
      case 'audio':
        return <StyledImage src={audio} alt="audio" title={getFileName(file)} />;
      case 'video':
        return <StyledImage src={video} alt="video" title={getFileName(file)} />;
      case 'word':
        return <StyledImage src={word} alt="word" title={getFileName(file)} />;
      case 'powerpoint':
        return <StyledImage src={PowerPoint} alt="powerPoint" title={getFileName(file)} />;
      case 'excel':
        return <StyledImage src={excel} alt="excel" title={getFileName(file)} />;
      default:
        return <StyledImage src={logo} alt="default" title={getFileName(file)} />;
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