import React, { ChangeEvent, Dispatch, DragEvent, SetStateAction, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import BannerNotification from '../bannerNotification/BannerNotification';
import { UploadStyles } from './UploadFiles.style';
import Box from '@mui/material/Box';
import BackupIcon from '@mui/icons-material/Backup';

interface UploadFilesProps {
  files: File[];
  setFiles: Dispatch<SetStateAction<File[]>>;
}

export default function UploadFiles({ files, setFiles }: UploadFilesProps) {
  const [showNotification, setShowNotification] = useState(false);

  const handleFileDrop = (e: DragEvent<HTMLDivElement> | ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const newFiles: File[] = [];

    if ('dataTransfer' in e) {
      for (let i = 0; i < e.dataTransfer.files.length; i++) {
        const file = e.dataTransfer.files[i];
        if (file && file.size <= 2 * 1024 * 1024) {
          newFiles.push(file);
        } else {
          setShowNotification(true);
        }
      }
    } else {
      const fileList = e.target?.files;
      if (fileList) {
        for (let i = 0; i < fileList.length; i++) {
          const file = fileList[i];
          if (file && file.size <= 2 * 1024 * 1024) {
            newFiles.push(file);
          } else {
            setShowNotification(true);
          }
        }
      }
    }
    setFiles([...files, ...newFiles]);
  };

  const handleFileDelete = (index: number) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  };

  return (
    <Box className="upload-container" sx={UploadStyles}>
      {showNotification && (
        <BannerNotification
          message='The file you want to upload is too large.'
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
        {files.length > 0 ? (
          <div className="files-list">
            {files.map((file, index) => (
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
