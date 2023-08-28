import React, { ChangeEvent, Dispatch, DragEvent, SetStateAction, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import BannerNotification from '../bannerNotification/BannerNotification';
import { UploadStyles } from './UploadFiles.style';
import Box from '@mui/material/Box';
import BackupIcon from '@mui/icons-material/Backup';
interface UploadFilesProps {
  files: File[];
   onChangeFiles: (event:File[]) => void;
}
export default function UploadFiles(props: UploadFilesProps) {

  const [showNotification, setShowNotification] = useState(false);
  const [message, setMessege] = useState("");
  const maxMB = 2 * 1024 * 1024;
  const newFiles: File[] = [];

  function addToFiles(files: File[]) {
    const containsHebrewLetters = (str: string) => {
      const regex = /[\u0590-\u05FF]/;
      return regex.test(str);
    };
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (containsHebrewLetters(file.name)) {
        setMessege("Uploading files is not supported with a file name in Hebrew.")
        setShowNotification(true);
      }
      else {
        if (file && file.size <= maxMB) {
          newFiles.push(file);
        }
        else {
          setMessege("The file you want to upload is too large.")
          setShowNotification(true);
        }
      }
    }
  }
  const handleFileDrop = (e: DragEvent<HTMLDivElement> | ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if ('dataTransfer' in e) {
      const filesArray = Array.from(e.dataTransfer.files);
      addToFiles(filesArray);
    } else {
      const filesArray = e.target?.files;
      if (filesArray) {
        const filesArrayConverted = Array.from(filesArray);
        addToFiles(filesArrayConverted);
      }
    }
    props.onChangeFiles([...props.files, ...newFiles])
   };
  const handleFileDelete = (index: number) => {
    const updatedFiles = [...props.files];
    updatedFiles.splice(index, 1);
    props.onChangeFiles(updatedFiles);
  };
  return (
    <Box className="upload-container" sx={UploadStyles}>
      {showNotification && (
        <BannerNotification
          message={message}
          severity="error"
          onClose={() => setShowNotification(false)}
        />
      )}
      <Box
        className="upload-area"
        onDrop={handleFileDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <label htmlFor="upload-input">
          <BackupIcon className='BackupIcon' />
        </label>
        <input
          id="upload-input"
          type="file"
          hidden
          onChange={handleFileDrop}
        />
        {props.files.length > 0 ? (
          <div className="files-list">
            {props.files.map((file, index) => (
              <div key={index} className="file-item">
                <div className="file-info">
                  <span>{file.name}</span>
                  <div onClick={() => handleFileDelete(index)}>
                    <CloseIcon className="delete-icon" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className='title'>
            <p>Please drag files here</p>
          </div>
        )}
      </Box>
    </Box>
  );
}