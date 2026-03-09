import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { AlertColor } from '@mui/material';
import { forwardRef, useState, SyntheticEvent, useEffect } from 'react';
export type BannerNotificationProps = {
  message: string;
  severity: AlertColor;
  onClose?: () => void;
};
const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export default function BannerNotification (props: BannerNotificationProps) {
  const { message, severity, onClose } = props;
  const [open, setOpen] = useState(true);
  const handleClose = (
    event?: SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    if (onClose) {
      onClose();
    }
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(false);
      if (onClose) {
        onClose();
      }
    }, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);
  return (
    <Stack spacing={2} sx={{ width: '100%' }} >
      <Snackbar open={open} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </Stack>
  );
}