import { faFile, faFileAlt, faFileExcel, faFileWord, faFilePowerpoint, } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import { Dialog, DialogContent, Grid, IconButton } from '@mui/material';
import React, {useState } from 'react';
import attachmentService from '../../service/attachmentService';
import { SingleAttachment, StyledFilePreview, StyledImage } from './attachment.style';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { Document, Page } from 'react-pdf';
import Loading from '../loading/loading';
interface KeyUrlPair {
  key: string;
  url: string;
}

const getFileName = (fileName: string) => {
  const parts = fileName.split('_');
  if (parts.length > 1) {
    const remainingString = parts[parts.length - 1];
    const trimmedString = remainingString.substring(13);
    console.log(trimmedString + "trimmedString")
    return trimmedString;
  }
  return '';
};

export default function Attachment({
  fileType,
  file,
  onDelete,
}: {
  fileType: string
  file: KeyUrlPair;
  onDelete: (fileId: string) => void;
}) {

  const handleDelete = async () => {
    try {
      await attachmentService.deleteAttachment(file.key);
      onDelete(file.key);
    } catch (error) {
      console.error('Error deleting attachment:', error);
    }
  };

  const handleDownload = async () => {
    const downloadLink = document.createElement("a");
    downloadLink.href = file.url;
    downloadLink.download = getFileName(file.key);
    downloadLink.click();
  };

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
    powerpoint: { icon: faFilePowerpoint, fontSize: '170px', marginBottom: '20px', marginLeft: '20px' },

  };

  const fileTypeMappings = {
    image: () => (
      <>
        <StyledImage src={file.url} onClick={openImageDialog} title={getFileName(file.key)} />
        <Dialog open={openDialog} onClose={closeImageDialog} BackdropProps={{ style: backdropStyles }}>
          <DialogContent>
            <img src={file.key} alt={getFileName(file.key)} style={{ width: '100%' }} />
          </DialogContent>
        </Dialog>
      </>
    ),
    pdf: () => (
      <StyledFilePreview >     
        <Document file={file.url} >
          <Page pageNumber={1} onClick={handleDownload} />
        </Document>
        </StyledFilePreview>

    ),
    audio: () => (
      <StyledFilePreview >     
        <audio controls>
          <source src={file.url} type="audio/mpeg" onClick={handleDownload} title={getFileName(file.key)} />
        </audio>
      </StyledFilePreview>
    ),
    video: () => (
      <StyledFilePreview >
        <video controls>
          <source src={file.url} type="video/mp4" onClick={handleDownload} title={getFileName(file.key)} />
        </video>
      </StyledFilePreview>
    ),
    default: () => (
      <div>
        <FontAwesomeIcon
          icon={faFile}
          title={getFileName(file.key)}
          style={{ color: '#2F854F', fontSize: '200px' }}
          onClick={handleDownload}
        />
      </div>
    ),
  } as Record<string, () => JSX.Element>;

  const renderFileContent = () => {
    console.log("fileType", fileType)
    console.log("url", file.url)
    if (fileType == 'image' && file == null)
      return <div><Loading /></div>;


    if (fileTypeStyles[fileType]) {
      const { icon, fontSize, marginBottom, marginLeft } = fileTypeStyles[fileType];
      return (
        <div title={getFileName(file.key)}>
          <FontAwesomeIcon icon={icon} style={{ color: '#2F854F', fontSize, marginBottom, marginLeft }} onClick={handleDownload} />
        </div>
      );
    }

    if (['image', 'pdf', 'video', 'audio'].includes(fileType)) {
      return (
        <StyledFilePreview title={getFileName(file.key)}>
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