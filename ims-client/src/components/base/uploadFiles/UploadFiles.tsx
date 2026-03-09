import BackupIcon from '@mui/icons-material/Backup';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import { ChangeEvent, Dispatch, DragEvent, SetStateAction, useState } from 'react';
import BannerNotification from '../bannerNotification/BannerNotification';
import { UploadStyles } from './UploadFiles.style';

interface UploadFilesProps {
  files: File[];
  setFiles: Dispatch<SetStateAction<File[]>>;
}

export default function UploadFiles({ files, setFiles }: UploadFilesProps) {
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const [message, setMessege] = useState<string>("");
  const maxMB: number = 2 * 1024 * 1024;
  const newFiles: File[] = [];
  function addToFiles(files: File[]) {
    const containsHebrewLetters = (str: string) => {
      const regex: RegExp = /[\u0590-\u05FF]/;
      return regex.test(str);
    };
    for (let i: number = 0; i < files.length; i++) {
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
      const filesArray: File[] = Array.from(e.dataTransfer.files);
      addToFiles(filesArray);
    } else {
      const filesArray: FileList | null = e.target?.files;
      if (filesArray) {
        const filesArrayConverted: File[] = Array.from(filesArray);
        addToFiles(filesArrayConverted);
      }
    }
    setFiles([...files, ...newFiles]);
  };
  const handleFileDelete = (index: number) => {
    const updatedFiles: File[] = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
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