// // // // // // // // import React, { useState, useRef } from 'react';
// // // // // // // // import BannerNotification from '../bannerNotification/BannerNotification';

// // // // // // // // interface UploadFilesProps {
// // // // // // // //   onFilesUpload: (files: File[]) => void;
// // // // // // // // }

// // // // // // // // export default function UploadFiles({ onFilesUpload }: UploadFilesProps) {
// // // // // // // //   const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
// // // // // // // //   const [showNotification, setShowNotification] = useState(false);
// // // // // // // //   const fileInputRef = useRef<HTMLInputElement>(null);

// // // // // // // //   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
// // // // // // // //     const files = event.target.files;
// // // // // // // //     if (files) {
// // // // // // // //       const newFiles = Array.from(files);
// // // // // // // //       validateAndUploadFiles(newFiles);
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   const validateAndUploadFiles = (files: File[]) => {
// // // // // // // //     const validFiles: File[] = [];
// // // // // // // //     const maxSize = 2 * 1024 * 1024; // 2 MB
// // // // // // // //     for (const file of files) {
// // // // // // // //       if (file.size <= maxSize) {
// // // // // // // //         validFiles.push(file);
// // // // // // // //       } else {
// // // // // // // //         setShowNotification(true);
// // // // // // // //       }
// // // // // // // //     }
// // // // // // // //     setUploadedFiles((prevUploadedFiles) => [...prevUploadedFiles, ...validFiles]);
// // // // // // // //     onFilesUpload([...uploadedFiles, ...validFiles]);
// // // // // // // //   };

// // // // // // // //   const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
// // // // // // // //     event.preventDefault();
// // // // // // // //     const files = Array.from(event.dataTransfer.files);
// // // // // // // //     validateAndUploadFiles(files);
// // // // // // // //   };

// // // // // // // //   const handleUploadClick = () => {
// // // // // // // //     if (fileInputRef.current) {
// // // // // // // //       fileInputRef.current.value = '';
// // // // // // // //       fileInputRef.current.click();
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   const handleDeleteFile = (fileToDelete: File) => {
// // // // // // // //     const newUploadedFiles = uploadedFiles.filter((file) => file !== fileToDelete);
// // // // // // // //     setUploadedFiles(newUploadedFiles);
// // // // // // // //   };

// // // // // // // //   const handleCloseNotification = () => {
// // // // // // // //     setShowNotification(false);
// // // // // // // //   };

// // // // // // // //   const deleteButtonStyle = {
// // // // // // // //     backgroundColor: 'transparent',
// // // // // // // //     border: 'none',
// // // // // // // //     cursor: 'pointer',
// // // // // // // //     marginLeft: '8px',
// // // // // // // //   };

// // // // // // // //   return (
// // // // // // // //     <div
// // // // // // // //       style={{
// // // // // // // //         width: '400px',
// // // // // // // //         height: '200px',
// // // // // // // //         border: '2px dashed #aaa',
// // // // // // // //         borderRadius: '4px',
// // // // // // // //         display: 'flex',
// // // // // // // //         flexDirection: 'column',
// // // // // // // //         alignItems: 'center',
// // // // // // // //         cursor: 'pointer',
// // // // // // // //       }}
// // // // // // // //       onClick={handleUploadClick}
// // // // // // // //       onDrop={handleDrop}
// // // // // // // //       onDragOver={(event) => event.preventDefault()}
// // // // // // // //     >
// // // // // // // //       <input
// // // // // // // //         type="file"
// // // // // // // //         multiple
// // // // // // // //         ref={fileInputRef}
// // // // // // // //         onChange={handleFileChange}
// // // // // // // //         style={{ display: 'none' }}
// // // // // // // //       />
// // // // // // // //       <p>Drag and drop files here or click to upload</p>
// // // // // // // //       {uploadedFiles.length > 0 && (
// // // // // // // //         <ul>
// // // // // // // //           {uploadedFiles.map((file, index) => (
// // // // // // // //             <li key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
// // // // // // // //               <span>{file.name}</span>
// // // // // // // //               <button onClick={() => handleDeleteFile(file)} style={deleteButtonStyle}>
// // // // // // // //                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20px" height="20px">
// // // // // // // //                   <path fill="#FF0000" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
// // // // // // // //                   <path d="M0 0h24v24H0z" fill="none"/>
// // // // // // // //                 </svg>
// // // // // // // //               </button>
// // // // // // // //             </li>
// // // // // // // //           ))}
// // // // // // // //         </ul>
// // // // // // // //       )}
// // // // // // // //       {showNotification && (
// // // // // // // //         <BannerNotification
// // // // // // // //           message="File exceeds the size limit"
// // // // // // // //           severity="error"
// // // // // // // //           onClose={handleCloseNotification}
// // // // // // // //         />
// // // // // // // //       )}
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // }

// // // // // // // import React, { useState, useRef } from 'react';
// // // // // // // import BannerNotification from '../bannerNotification/BannerNotification';

// // // // // // // interface UploadFilesProps {
// // // // // // //   onFilesUpload: (files: File[]) => void;
// // // // // // // }

// // // // // // // export default function UploadFiles({ onFilesUpload }: UploadFilesProps) {
// // // // // // //   const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
// // // // // // //   const [showNotification, setShowNotification] = useState(false);
// // // // // // //   const fileInputRef = useRef<HTMLInputElement>(null);

// // // // // // //   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
// // // // // // //     const files = event.target.files;
// // // // // // //     if (files) {
// // // // // // //       const newFiles = Array.from(files);
// // // // // // //       validateAndUploadFiles(newFiles);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const validateAndUploadFiles = (files: File[]) => {
// // // // // // //     const validFiles: File[] = [];
// // // // // // //     const maxSize = 2 * 1024 * 1024; // 2 MB
// // // // // // //     for (const file of files) {
// // // // // // //       if (file.size <= maxSize) {
// // // // // // //         validFiles.push(file);
// // // // // // //       } else {
// // // // // // //         setShowNotification(true);
// // // // // // //       }
// // // // // // //     }
// // // // // // //     setUploadedFiles((prevUploadedFiles) => [...prevUploadedFiles, ...validFiles]);
// // // // // // //     onFilesUpload([...uploadedFiles, ...validFiles]);
// // // // // // //   };

// // // // // // //   const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
// // // // // // //     event.preventDefault();
// // // // // // //     const files = Array.from(event.dataTransfer.files);
// // // // // // //     validateAndUploadFiles(files);
// // // // // // //   };

// // // // // // //   const handleUploadClick = () => {
// // // // // // //     if (fileInputRef.current) {
// // // // // // //       fileInputRef.current.value = '';
// // // // // // //       fileInputRef.current.click();
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const handleDeleteFile = (fileToDelete: File) => {
// // // // // // //     const newUploadedFiles = uploadedFiles.filter((file) => file !== fileToDelete);
// // // // // // //     setUploadedFiles(newUploadedFiles);
// // // // // // //   };

// // // // // // //   const handleCloseNotification = () => {
// // // // // // //     setShowNotification(false);
// // // // // // //   };

// // // // // // //   const deleteButtonStyle = {
// // // // // // //     backgroundColor: 'transparent',
// // // // // // //     border: 'none',
// // // // // // //     cursor: 'pointer',
// // // // // // //     display: 'flex',
// // // // // // //     justifyContent: 'flex-start',
// // // // // // //     marginLeft: '8px',
// // // // // // //   };

// // // // // // //   return (
// // // // // // //     <div
// // // // // // //       style={{
// // // // // // //         width: '400px',
// // // // // // //         height: '200px',
// // // // // // //         border: '2px dashed #aaa',
// // // // // // //         borderRadius: '4px',
// // // // // // //         display: 'flex',
// // // // // // //         flexDirection: 'column',
// // // // // // //         alignItems: 'center',
// // // // // // //         cursor: 'pointer',
// // // // // // //       }}
// // // // // // //       onClick={handleUploadClick}
// // // // // // //       onDrop={handleDrop}
// // // // // // //       onDragOver={(event) => event.preventDefault()}
// // // // // // //     >
// // // // // // //       <input
// // // // // // //         type="file"
// // // // // // //         multiple
// // // // // // //         ref={fileInputRef}
// // // // // // //         onChange={handleFileChange}
// // // // // // //         style={{ display: 'none' }}
// // // // // // //       />
// // // // // // //       <p>Drag and drop files here or click to upload</p>
// // // // // // //       {uploadedFiles.length > 0 && (
// // // // // // //         <ul>
// // // // // // //           {uploadedFiles.map((file, index) => (
// // // // // // //             <li key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
// // // // // // //               <span>{file.name}</span>
// // // // // // //               <button onClick={() => handleDeleteFile(file)} style={deleteButtonStyle}>
// // // // // // //                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20px" height="20px" style={{ marginRight: '8px' }}>
// // // // // // //                   <path fill="#FF0000" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
// // // // // // //                   <path d="M0 0h24v24H0z" fill="none"/>
// // // // // // //                 </svg>
// // // // // // //               </button>
// // // // // // //             </li>
// // // // // // //           ))}
// // // // // // //         </ul>
// // // // // // //       )}
// // // // // // //       {showNotification && (
// // // // // // //         <BannerNotification
// // // // // // //           message="File exceeds the size limit"
// // // // // // //           severity="error"
// // // // // // //           onClose={handleCloseNotification}
// // // // // // //         />
// // // // // // //       )}
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // }

// // // // // // import React, { useState, useRef } from 'react';
// // // // // // import BannerNotification from '../bannerNotification/BannerNotification';

// // // // // // interface UploadFilesProps {
// // // // // //   onFilesUpload: (files: File[]) => void;
// // // // // // }

// // // // // // export default function UploadFiles({ onFilesUpload }: UploadFilesProps) {
// // // // // //   const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
// // // // // //   const [showNotification, setShowNotification] = useState(false);
// // // // // //   const fileInputRef = useRef<HTMLInputElement>(null);

// // // // // //   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
// // // // // //     const files = event.target.files;
// // // // // //     if (files) {
// // // // // //       const newFiles = Array.from(files);
// // // // // //       validateAndUploadFiles(newFiles);
// // // // // //     }
// // // // // //   };

// // // // // //   const validateAndUploadFiles = (files: File[]) => {
// // // // // //     const validFiles: File[] = [];
// // // // // //     const maxSize = 2 * 1024 * 1024; // 2 MB
// // // // // //     for (const file of files) {
// // // // // //       if (file.size <= maxSize) {
// // // // // //         validFiles.push(file);
// // // // // //       } else {
// // // // // //         setShowNotification(true);
// // // // // //       }
// // // // // //     }
// // // // // //     setUploadedFiles((prevUploadedFiles) => [...prevUploadedFiles, ...validFiles]);
// // // // // //     onFilesUpload([...uploadedFiles, ...validFiles]);
// // // // // //   };

// // // // // //   const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
// // // // // //     event.preventDefault();
// // // // // //     const files = Array.from(event.dataTransfer.files);
// // // // // //     validateAndUploadFiles(files);
// // // // // //   };

// // // // // //   const handleUploadClick = () => {
// // // // // //     if (fileInputRef.current) {
// // // // // //       fileInputRef.current.value = '';
// // // // // //       fileInputRef.current.click();
// // // // // //     }
// // // // // //   };

// // // // // //   const handleDeleteFile = (fileToDelete: File) => {
// // // // // //     const newUploadedFiles = uploadedFiles.filter((file) => file !== fileToDelete);
// // // // // //     setUploadedFiles(newUploadedFiles);
// // // // // //   };

// // // // // //   const handleCloseNotification = () => {
// // // // // //     setShowNotification(false);
// // // // // //   };

// // // // // //   const deleteButtonStyle = {
// // // // // //     backgroundColor: 'transparent',
// // // // // //     border: 'none',
// // // // // //     cursor: 'pointer',
// // // // // //     display: 'flex',
// // // // // //     justifyContent: 'flex-start',
// // // // // //     marginLeft: '8px',
// // // // // //   };

// // // // // //   return (
// // // // // //     <div
// // // // // //       style={{
// // // // // //         width: '400px',
// // // // // //         height: '200px',
// // // // // //         border: '2px dashed #aaa',
// // // // // //         borderRadius: '4px',
// // // // // //         display: 'flex',
// // // // // //         flexDirection: 'column',
// // // // // //         alignItems: 'center',
// // // // // //         cursor: 'pointer',
// // // // // //       }}
// // // // // //       onClick={handleUploadClick}
// // // // // //       onDrop={handleDrop}
// // // // // //       onDragOver={(event) => event.preventDefault()}
// // // // // //     >
// // // // // //       <input
// // // // // //         type="file"
// // // // // //         multiple
// // // // // //         ref={fileInputRef}
// // // // // //         onChange={handleFileChange}
// // // // // //         style={{ display: 'none' }}
// // // // // //       />
// // // // // //       <p>Drag and drop files here or click to upload</p>
// // // // // //       {uploadedFiles.length > 0 && (
// // // // // //         <ul>
// // // // // //           {uploadedFiles.map((file, index) => (
// // // // // //             <li key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
// // // // // //               <button onClick={() => handleDeleteFile(file)} style={deleteButtonStyle}>
// // // // // //                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20px" height="20px" style={{ marginRight: '8px' }}>
// // // // // //                   <path fill="#FF0000" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
// // // // // //                   <path d="M0 0h24v24H0z" fill="none"/>
// // // // // //                 </svg>
// // // // // //               </button>
// // // // // //               <span style={{ marginRight: '8px' }}>{file.name}</span>
// // // // // //             </li>
// // // // // //           ))}
// // // // // //         </ul>
// // // // // //       )}
// // // // // //       {showNotification && (
// // // // // //         <BannerNotification
// // // // // //           message="File exceeds the size limit"
// // // // // //           severity="error"
// // // // // //           onClose={handleCloseNotification}
// // // // // //         />
// // // // // //       )}
// // // // // //     </div>
// // // // // //   );
// // // // // // }

// // // // // import React, { useState, useRef } from 'react';
// // // // // import { AttachFile } from '@material-ui/icons';
// // // // // import BannerNotification from '../bannerNotification/BannerNotification';

// // // // // interface UploadFilesProps {
// // // // //   onFilesUpload: (files: File[]) => void;
// // // // // }

// // // // // export default function UploadFiles({ onFilesUpload }: UploadFilesProps) {
// // // // //   const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
// // // // //   const [showNotification, setShowNotification] = useState(false);
// // // // //   const fileInputRef = useRef<HTMLInputElement>(null);

// // // // //   const validateAndUploadFiles = (files: File[]) => {
// // // // //     const validFiles: File[] = [];
// // // // //     const maxSize = 2 * 1024 * 1024; // 2 MB
// // // // //     for (const file of files) {
// // // // //       if (file.size <= maxSize) {
// // // // //         validFiles.push(file);
// // // // //       } else {
// // // // //         setShowNotification(true);
// // // // //       }
// // // // //     }
// // // // //     setUploadedFiles((prevUploadedFiles) => [...prevUploadedFiles, ...validFiles]);
// // // // //     onFilesUpload([...uploadedFiles, ...validFiles]);
// // // // //   };

// // // // //   const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
// // // // //     event.preventDefault();
// // // // //     const files = Array.from(event.dataTransfer.files);
// // // // //     validateAndUploadFiles(files);
// // // // //   };

// // // // //   const handleIconClick = () => {
// // // // //     if (fileInputRef.current) {
// // // // //       fileInputRef.current.value = '';
// // // // //       fileInputRef.current.click();
// // // // //     }
// // // // //   };

// // // // //   const handleIconKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
// // // // //     if (event.key === 'Enter') {
// // // // //       handleIconClick();
// // // // //     }
// // // // //   };

// // // // //   const handleDeleteFile = (fileToDelete: File) => {
// // // // //     const newUploadedFiles = uploadedFiles.filter((file) => file !== fileToDelete);
// // // // //     setUploadedFiles(newUploadedFiles);
// // // // //   };

// // // // //   const handleCloseNotification = () => {
// // // // //     setShowNotification(false);
// // // // //   };

// // // // //   const deleteButtonStyle = {
// // // // //     backgroundColor: 'transparent',
// // // // //     border: 'none',
// // // // //     cursor: 'pointer',
// // // // //     display: 'flex',
// // // // //     justifyContent: 'flex-start',
// // // // //     marginLeft: '8px',
// // // // //   };

// // // // //   const iconStyle = {
// // // // //     width: '24px',
// // // // //     height: '24px',
// // // // //     cursor: 'pointer',
// // // // //     order: -1,
// // // // //     marginRight: '8px',
// // // // //   };

// // // // //   const fileNameStyle = {
// // // // //     overflow: 'hidden',
// // // // //     textOverflow: 'ellipsis',
// // // // //     textAlign: 'right',
// // // // //     flex: 1,
// // // // //   };

// // // // //   return (
// // // // //     <div
// // // // //       style={{
// // // // //         width: '400px',
// // // // //         height: '200px',
// // // // //         border: '2px dashed #aaa',
// // // // //         borderRadius: '4px',
// // // // //         display: 'flex',
// // // // //         flexDirection: 'column',
// // // // //         alignItems: 'center',
// // // // //         cursor: 'pointer',
// // // // //       }}
// // // // //       onDrop={handleDrop}
// // // // //       onDragOver={(event) => event.preventDefault()}
// // // // //     >
// // // // //       <input
// // // // //         type="file"
// // // // //         multiple
// // // // //         ref={fileInputRef}
// // // // //         onChange={(event) => {
// // // // //           const files = event.target.files;
// // // // //           if (files) {
// // // // //             const newFiles = Array.from(files);
// // // // //             validateAndUploadFiles(newFiles);
// // // // //           }
// // // // //         }}
// // // // //         style={{ display: 'none' }}
// // // // //       />
// // // // //       <div style={{ display: 'flex', alignItems: 'center' }}>
// // // // //         <div
// // // // //          style={iconStyle}
// // // // //           tabIndex={0}
// // // // //           onClick={handleIconClick}
// // // // //           onKeyDown={handleIconKeyDown}
// // // // //           role="button"
// // // // //         >
// // // // //           <AttachFile />
// // // // //         </div>
// // // // //         {uploadedFiles.length > 0 && (
// // // // //           <ul style={{ margin: 0, padding: 0 }}>
// // // // //             {uploadedFiles.map((file, index) => (
// // // // //               <li
// // // // //                 key={index}
// // // // //                 style={{
// // // // //                   display: 'flex',
// // // // //                   alignItems: 'center',
// // // // //                   marginTop: '8px',
// // // // //                   listStyle: 'none',
// // // // //                   width: '100%',
// // // // //                 }}
// // // // //               >
// // // // //                 <button
// // // // //                   style={deleteButtonStyle}
// // // // //                   onClick={() => handleDeleteFile(file)}
// // // // //                   aria-label={`Delete ${file.name}`}
// // // // //                 >
// // // // //                   <span aria-hidden="true">&times;</span>
// // // // //                 </button>
// // // // //                 <span style={fileNameStyle}>{file.name}</span>
// // // // //               </li>
// // // // //             ))}
// // // // //           </ul>
// // // // //         )}
// // // // //       </div>
// // // // //       <p style={{ margin: '8px 0' }}>Drag and drop files here or click the icon to upload</p>
// // // // //       {showNotification && (
// // // // //         <BannerNotification
// // // // //           message="File size exceeds 2MB"
// // // // //           onClose={handleCloseNotification}
// // // // //           variant="error"
// // // // //         />
// // // // //       )}
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // import React, { useState, useRef } from 'react';
// // // // import { AttachFile } from '@material-ui/icons';
// // // // import BannerNotification from '../bannerNotification/BannerNotification';

// // // // interface UploadFilesProps {
// // // //   onFilesUpload: (files: File[]) => void;
// // // // }

// // // // export default function UploadFiles({ onFilesUpload }: UploadFilesProps) {
// // // //   const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
// // // //   const [showNotification, setShowNotification] = useState(false);
// // // //   const fileInputRef = useRef<HTMLInputElement>(null);

// // // //   const validateAndUploadFiles = (files: File[]) => {
// // // //     const validFiles: File[] = [];
// // // //     const maxSize = 2 * 1024 * 1024; // 2 MB
// // // //     for (const file of files) {
// // // //       if (file.size <= maxSize) {
// // // //         validFiles.push(file);
// // // //       } else {
// // // //         setShowNotification(true);
// // // //       }
// // // //     }
// // // //     setUploadedFiles((prevUploadedFiles) => [...prevUploadedFiles, ...validFiles]);
// // // //     onFilesUpload([...uploadedFiles, ...validFiles]);
// // // //   };

// // // //   const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
// // // //     event.preventDefault();
// // // //     const files = Array.from(event.dataTransfer.files);
// // // //     validateAndUploadFiles(files);
// // // //   };

// // // //   const handleIconClick = () => {
// // // //     if (fileInputRef.current) {
// // // //       fileInputRef.current.value = '';
// // // //       fileInputRef.current.click();
// // // //     }
// // // //   };

// // // //   const handleIconKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
// // // //     if (event.key === 'Enter') {
// // // //       handleIconClick();
// // // //     }
// // // //   };

// // // //   const handleDeleteFile = (fileToDelete: File) => {
// // // //     const newUploadedFiles = uploadedFiles.filter((file) => file !== fileToDelete);
// // // //     setUploadedFiles(newUploadedFiles);
// // // //   };

// // // //   const handleCloseNotification = () => {
// // // //     setShowNotification(false);
// // // //   };

// // // //   const deleteButtonStyle = {
// // // //     backgroundColor: 'transparent',
// // // //     border: 'none',
// // // //     cursor: 'pointer',
// // // //     display: 'flex',
// // // //     justifyContent: 'flex-start',
// // // //     marginLeft: '8px',
// // // //   };

// // // //   const iconStyle = {
// // // //     width: '24px',
// // // //     height: '24px',
// // // //     cursor: 'pointer',
// // // //     order: -1,
// // // //     marginRight: '8px',
// // // //   };

// // // //   const fileNameStyle = {
// // // //     overflow: 'hidden',
// // // //     textOverflow: 'ellipsis',
// // // //     textAlign: 'right' as const,
// // // //     flex: 1,
// // // //   };

// // // //   return (
// // // //     <div
// // // //       style={{
// // // //         width: '400px',
// // // //         height: '200px',
// // // //         border: '2px dashed #aaa',
// // // //         borderRadius: '4px',
// // // //         display: 'flex',
// // // //         flexDirection: 'column',
// // // //         alignItems: 'center',
// // // //         cursor: 'pointer',
// // // //       }}
// // // //       onDrop={handleDrop}
// // // //       onDragOver={(event) => event.preventDefault()}
// // // //     >
// // // //       <input
// // // //         type="file"
// // // //         multiple
// // // //         ref={fileInputRef}
// // // //         onChange={(event) => {
// // // //           const files = event.target.files;
// // // //           if (files) {
// // // //             const newFiles = Array.from(files);
// // // //             validateAndUploadFiles(newFiles);
// // // //           }
// // // //         }}
// // // //         style={{ display: 'none' }}
// // // //       />
// // // //       <div style={{ display: 'flex', alignItems: 'center' }}>
// // // //         <div
// // // //           style={iconStyle}
// // // //           tabIndex={0}
// // // //           onClick={handleIconClick}
// // // //           onKeyDown={handleIconKeyDown}
// // // //           role="button"
// // // //         >
// // // //           <AttachFile />
// // // //         </div>
// // // //         {uploadedFiles.length > 0 && (
// // // //           <ul style={{ margin: 0, padding: 0 }}>
// // // //             {uploadedFiles.map((file, index) => (
// // // //               <li
// // // //                 key={index}
// // // //                 style={{
// // // //                   display: 'flex',
// // // //                   alignItems: 'center',
// // // //                   marginTop: '8px',
// // // //                   listStyle: 'none',
// // // //                   width: '100%',
// // // //                 }}
// // // //               >
// // // //                 <div style={{ ...fileNameStyle, marginLeft: '8px' }}>{file.name}</div>
// // // //                 <button
// // // //                   style={deleteButtonStyle}
// // // //                   onClick={() => handleDeleteFile(file)}
// // // //                   aria-label={`Delete ${file.name}`}
// // // //                 >
// // // //                   <span aria-hidden="true">&times;</span>
// // // //                 </button>
// // // //               </li>
// // // //             ))}
// // // //           </ul>
// // // //         )}
// // // //       </div>
// // // //       <p style={{ margin: '8px 0' }}>Drag and drop files here or click the icon toupload files</p>
// // // //       {showNotification && (
// // // //         <BannerNotification
// // // //           message="File size exceeds 2MB limit"
// // // //           onClose={handleCloseNotification}
// // // //         severity="error"
// // // //         />
// // // //       )}
// // // //     </div>
// // // //   );
// // // // }

// // // import React, { useState } from "react";

// // // interface FileUploaderProps {
// // //   url: string;
// // //   onSuccess?: (response: any) => void;
// // //   onError?: (error: Error) => void;
// // // }

// // // const FileUploader: React.FC<FileUploaderProps> = ({ url, onSuccess, onError }) => {
// // //   const [isDragging, setIsDragging] = useState(false);
// // //   const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

// // //   const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
// // //     event.preventDefault();
// // //     setIsDragging(true);
// // //   };

// // //   const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
// // //     event.preventDefault();
// // //     setIsDragging(true);
// // //   };

// // //   const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
// // //     event.preventDefault();
// // //     setIsDragging(false);
// // //   };

// // //   const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
// // //     event.preventDefault();
// // //     setIsDragging(false);

// // //     const files = event.dataTransfer.files;
// // //     setSelectedFiles(Array.from(files));
// // //   };

// // //   const handleFileInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
// // //     const files = event.target.files;

// // //     if (files) {
// // //       setSelectedFiles(Array.from(files));
// // //     }
// // //   };

// // //   const uploadFiles = async () => {
// // //     if (selectedFiles.length === 0) {
// // //       return;
// // //     }

// // //     const formData = new FormData();

// // //     selectedFiles.forEach((file) => {
// // //       formData.append("files[]", file);
// // //     });

// // //     try {
// // //       const response = await fetch(url, {
// // //         method: "POST",
// // //         body: formData,
// // //       });

// // //       if (!response.ok) {
// // //         throw new Error("Upload failed");
// // //       }

// // //       const data = await response.json();

// // //       if (onSuccess) {
// // //         onSuccess(data);
// // //       }

// // //       setSelectedFiles([]);
// // //     } catch (error) {
// // //       if (onError) {
// // //         onError(error);
// // //       }
// // //     }
// // //   };

// // //   const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
// // //     event.preventDefault();
// // //     await uploadFiles();
// // //   };

// // //   return (
// // //     <div
// // //       className={`box ${isDragging ? "is-dragover" : ""}`}
// // //       onDragEnter={handleDragEnter}
// // //       onDragOver={handleDragOver}
// // //       onDragLeave={handleDragLeave}
// // //       onDrop={handleDrop}
// // //     >
// // //       <form
// // //         method="post"
// // //         action=""
// // //         encType="multipart/form-data"
// // //         onSubmit={handleFormSubmit}
// // //       >
// // //         <div className="box__input">
// // //           {selectedFiles.length > 0 ? (
// // //             <ul className="box__file-list">
// // //               {selectedFiles.map((file) => (
// // //                 <li className="box__file-item" key={file.name}>
// // //                   {file.name} ({file.size} bytes)
// // //                 </li>
// // //               ))}
// // //             </ul>
// // //           ) : (
// // //             <>
// // //               <input
// // //                 className="box__file"
// // //                 type="file"
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