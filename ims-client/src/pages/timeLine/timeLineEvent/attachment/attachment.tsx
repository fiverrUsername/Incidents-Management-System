

import React from 'react';
import { FileDownload } from '@mui/icons-material';

export interface AttachmentProps {
  attachmentFile: string;
}


const Attachment: React.FC<AttachmentProps> = ({ attachmentFile }) => {
  const iconStyle: React.CSSProperties = {
    position: 'absolute',
    zIndex: 1,
    bottom: 10,
    right: 10,
  };

  return (
    <div>
      <img src={attachmentFile} style={{ position: 'absolute', zIndex: '1 !important' }} />
      <FileDownload style={{ position: 'absolute', zIndex: '3 !important' }} />
    </div>
  );
};

export default Attachment;
