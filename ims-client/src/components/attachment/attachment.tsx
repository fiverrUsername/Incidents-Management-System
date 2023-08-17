import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import { Grid, IconButton } from '@mui/material';
import download from 'downloadjs';
import React, { useEffect, useState } from 'react';
import { IAttachmentData } from '../../interface/timeLineInterface';
import attachmentService from '../../service/attachmentService';
import { SingleAttachment, StyledImage } from './attachment.style';

import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import AudiotrackIcon from '@material-ui/icons/Audiotrack';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import DescriptionIcon from '@material-ui/icons/Description';
import SlideshowIcon from '@material-ui/icons/Slideshow';
import InsertChartIcon from '@material-ui/icons/InsertChart';
import ImageIcon from '@material-ui/icons/Image';
import SubjectIcon from '@material-ui/icons/Subject';



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
      const iconStyle = {
        fontSize: '200px',  
        color: 'green',   
      };
      switch (fileType) {
        case 'image':
           
          renderImageContent();
          return <ImageIcon titleAccess={getFileName(file.key)}style={iconStyle} />;
        case 'pdf':
          return <PictureAsPdfIcon titleAccess={getFileName(file.key)}style={iconStyle} />;
        case 'txt':
          return <SubjectIcon titleAccess={getFileName(file.key)} style={iconStyle}/>;
        case 'audio':
          return <AudiotrackIcon titleAccess={getFileName(file.key)} style={iconStyle}/>;
        case 'video':
          return <VideoLibraryIcon titleAccess={getFileName(file.key)} style={iconStyle}/>;
        case 'word':
          return <DescriptionIcon titleAccess={getFileName(file.key)} style={iconStyle}/>;
        case 'powerpoint':
          return <SlideshowIcon titleAccess={getFileName(file.key)} style={iconStyle}/>;
        case 'excel':
          return <InsertChartIcon titleAccess={getFileName(file.key)} style={iconStyle}/>;
        default:
          return <InsertDriveFileIcon titleAccess={getFileName(file.key)} style={iconStyle}/>;
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