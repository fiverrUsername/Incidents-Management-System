import React, { useEffect, useState } from 'react';
import { Dialog, FormControl, InputLabel, Grid, Button } from "@mui/material";
import { useForm } from 'react-hook-form';
import CloseIcon from '@mui/icons-material/Close';
import DateTimePickerValue from '../datePicker/datePicker';
import TextFieldInput from '../AddIncident/TextFields'
import ToggleButtons from '../AddIncident/PriorityButtons';
import DropDown from '../AddIncident/DropDown';
import dayjs from 'dayjs';
import Option from '../../interface/IOption';
import submitIncident from '../submitIncident/submitIncident';
import theme from '../../theme';
import apiCalls from '../../service/apiCalls';
import BannerNotification from "../bannerNotification/BannerNotification"
export interface FormData {
  text: string;
  priority: string;
  date: dayjs.Dayjs;
}
interface Props {
  open: boolean;
  onClose: () => void; 
  priorityProp: string;
}

export default function AddUpdate({ open, onClose, priorityProp }: Props) {
  const { handleSubmit, register, formState: { errors } } = useForm<FormData>();
  const [priority, setPriority] = React.useState<string | null>('p0');
  const [date, setDate] = React.useState<dayjs.Dayjs | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  // String(priorityProp)

  function onSubmit(data: FormData) {
    setIsSubmit(true);
    setShowBanner(true);
    if (priority != null)
      data.priority = priority
    if (date == null)
      data.date = dayjs();
    else
      data.date = date
  }
  const closeIconStyles: React.CSSProperties = {
    width: '17px',
    height: '17px',
    flexShrink: 0,
    strokeWidth: '1px',
    stroke: '#000',
    position: 'absolute',
    top: '20px',
    right: '20px',
    cursor: 'pointer',
  };
  const errorColor = theme.palette.error.light;
  const popupStyles: React.CSSProperties = {
    background: '#FFF',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '20px',
    padding: '30px 31px',
    borderRadius: '20px',
  };
  const backdropStyles: React.CSSProperties = {
    background: 'rgba(0, 48, 18, 0.84)',
  };

  useEffect(() => {
      // setPriority(priorityProp);
  }, []);



  return (
    <Dialog open={open} PaperProps={{ style: { borderRadius: 20 } }} onClose={onClose} BackdropProps={{ style: backdropStyles }} scroll={'body'}>
      <div className="addUpdate" style={popupStyles}>
      
        <CloseIcon style={closeIconStyles} onClick={onClose} />
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
          <h2>Add Update</h2>
          <h1>{priority}</h1>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <label htmlFor="text">Text</label>
                <TextFieldInput placeholder="your update..." multiline rows={3}
                  size="medium"
                  {...register("text", {
                    required: "text is required",
                  })} />

                {errors.text && <span style={{ color: errorColor }}>{errors.text.message}</span>}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth >
                <label htmlFor="priority">Priority</label>
                <div id="priority">
                  <ToggleButtons setPriority={setPriority} priority={priority} />
                </div>
              </FormControl>
            </Grid>
            <Grid item xs={12}  >
              <Grid spacing={2} container>
                <Grid item xs={6}>
                  <FormControl style={{ width: '100%' }}>
                    <label htmlFor="date">Date (optional)</label>
                    <DateTimePickerValue date={date} setDate={setDate} />
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" style={{ width: '100%' }}>Update</Button>
            </Grid>
          </Grid>
        </form>
      </div>
      {showBanner && (
        <BannerNotification message="new update Added Successfully" severity="success" onClose={() => onClose()} />
     )}
    </Dialog>
  );
}
