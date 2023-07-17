

import React from 'react';
import { FileDownload } from '@mui/icons-material';

export interface AttachmentProps {
  attachmentFile: string;
  numberOfImages: string;
}
//דוגמה לזימון הקומפוננטה:
{/* <Attachment attachmentFile="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQB9hfMxrD1ywcTDkrqvYu2CPDaDifO3AtmLztsKh4ZqkvS1jZdEQ1DWupA9KJCrQ-wnZI&usqp=CAU"
numberOfImages='singleImage'></Attachment> */}

const Attachment: React.FC<AttachmentProps> = ({ attachmentFile, numberOfImages }) => {

    const singleImageStyle: React.CSSProperties = {
    height: '228px',
    width: '500px',
    position: 'relative',
    borderRadius: '10px'
  };
  const twoImagesStyle: React.CSSProperties = {
    height: '228px',
    width: '352px',
    position: 'relative',
    borderRadius: '10px'
  };
  const threeAndMoreImagesStyle: React.CSSProperties = {
    height: '228px',
    width: '228px',
    position: 'relative',
    borderRadius: '10px'
  };

  const styleMap: { [key: string]: React.CSSProperties } = {
    singleImage: {
      ...singleImageStyle,
    },
    twoImages: {
      ...twoImagesStyle,
    },
    threeAndMoreImages: {
      ...threeAndMoreImagesStyle,
    },
  };

  const iconStyle: React.CSSProperties = {
    position: 'absolute',
    zIndex: 1,
    bottom: 10,
    right: 10,
  };
//mnn
  return (
    <div>
      <div style={styleMap[numberOfImages]}>
        <img src={attachmentFile} style={styleMap[numberOfImages]}  />
        <FileDownload style={iconStyle} />
        
      </div>
    </div>
  );
};

export default Attachment;
