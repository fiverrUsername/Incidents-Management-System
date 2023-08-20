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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dialog, DialogContent } from '@mui/material';
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
import Loading from '../loading/loading';
import theme from '../../theme';
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
      renderFileContent()
      fetchDownloadUrl()
     }, []);

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
    let url:string;
    try {
    const response = await attachmentService.getUrl(file);
    setDownloadUrl(response);
    url=response;
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
  const [openDialog, setOpenDialog] = useState(false);
  const backdropStyles: React.CSSProperties = {
    background: 'rgba(0, 48, 18, 0.84)',
  };
  const openImageDialog = () => {
    setOpenDialog(true);
  };
  const closeImageDialog = () => {
    setOpenDialog(false);
  };

  const renderFileContent = () => {
    if(fileType=='image'&&downloadUrl===null)
      return <div><Loading></Loading></div>;
    // if (!file) {
    //   return null;
    // }
    else
    switch (fileType) {
      case 'image':
        return (
          <>
            <StyledImage src={downloadUrl} title="File Viewer" onClick={openImageDialog} />
            <Dialog open={openDialog} onClose={closeImageDialog} BackdropProps={{style: backdropStyles}}>
              <DialogContent>
                <img src={downloadUrl} alt={getFileName(file)} style={{ width: '100%' }} />
              </DialogContent>
            </Dialog>
          </>
        );
      case 'pdf':
        return <div><FontAwesomeIcon icon={faFilePdf} title={getFileName(file)} style={{ color: '#2F854F',marginLeft:'20px', fontSize: '200px' }}/></div>
      case 'txt':
        return <div><FontAwesomeIcon icon={faFileAlt} title={getFileName(file)} style={{marginBottom:'20px', marginLeft:'20px',color: '#2F854F', fontSize: '170px' }}/></div>
      case 'audio':
        return <div><FontAwesomeIcon icon={faFileAudio} title={getFileName(file)} style={{ color: '#2F854F', fontSize: '200px' }}/></div>
      case 'video':
        return <div><FontAwesomeIcon icon={faFileVideo} title={getFileName(file)} style={{ color: '#2F854F', fontSize: '200px' }}/></div>
      case 'word':
        return <div><FontAwesomeIcon icon={faFileWord} title={getFileName(file)} style={{marginBottom:'20px', marginLeft:'20px',color: '#2F854F', fontSize: '170px' }}/></div>
      case 'powerpoint':
        return <div><FontAwesomeIcon icon={faFilePowerpoint} title={getFileName(file)} style={{ color: '#2F854F', fontSize: '200px' }}/></div>
      case 'excel':
        return <div><FontAwesomeIcon icon={faFileExcel} title={getFileName(file)} style={{marginBottom:'20px', marginLeft:'20px',color: '#2F854F', fontSize: '170px' }}/></div>
      default:
        return <div><FontAwesomeIcon icon={faFile} title={getFileName(file)} style={{ color: '#2F854F', fontSize: '200px' }}/></div>
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