import CloseIcon from '@mui/icons-material/Close';
import { AlertColor, Button, Dialog, FormControl, Grid } from "@mui/material";
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { ITag } from '../../../../interfaces/ITag';
import { ITimeLineEvent } from '../../../../interfaces/ITimeLineEvent';
import { Priority, Status } from '../../../../interfaces/enums';
import attachmentServices from '../../../../services/backendServices/attachmentServices';
import backendServices from '../../../../services/backendServices/backendServices';
import submitTimeLine from '../../../../services/functions/timeline/submitTimeLine';
import theme from '../../../../theme';
import TextFieldInput from '../../../../trash/TextFields';
import CustomAutocomplete from '../../../base/autoCompleteTag/autoComplete';
import BannerNotification from '../../../base/bannerNotification/BannerNotification';
import DatePicker from '../../../base/datePicker/datePicker';
import ToggleButtons from '../../../base/priorityButtons/priorityButtons';
import UploadFiles from '../../../base/uploadFiles/UploadFiles';


// import DropDown from '../base/dropDown/DropDown';
// import DropDown from './StatusDropDown';

export interface dataFromForm {
  text: string;
  priority: Priority;
  date: dayjs.Dayjs;
  type: string;
  tags: ITag[];
  files: string[];
  status: Status;
}
export interface receivedIncident {
  id: string;
  name: string;
  status: Status;
  description: string;
  currentPriority: Priority;
  type: string;
  durationHours: number;
  channelId?: string;
  slackLink: string;
  channelName?: string;
  currentTags: ITag[];
  date: Date;
  createdAt: Date;
  updatedAt: Date;
  cost: number;
  createdBy: string;
}
interface Props {
  open: boolean;
  incident: receivedIncident;
  onClose: () => void;
  addNewTimelineFunction: (newTimeline: ITimeLineEvent) => void;
}
export default function addTimelineForm({ open, incident, onClose, addNewTimelineFunction }: Props) {

  const { handleSubmit, register, formState: { errors } } = useForm<dataFromForm>();

  const [priority, setPriority] = React.useState<Priority>(incident.currentPriority);
  const [date, setDate] = React.useState<dayjs.Dayjs | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [type, setType] = React.useState(incident.type);
  const [status, setStatus] = React.useState<Status>(incident.status);
  const [tags, setTags] = useState<ITag[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [filesString, setFilesString] = useState<string[]>([]);
  const [severityValue, setSeverityValue] = useState<AlertColor>('error');
  const [messageValue, setMessageValue] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<ITag[]>(incident.currentTags);

  const getOptionLabel = (option: ITag) => option.name;

  async function onSubmit(data: dataFromForm) {
    setIsSubmit(true);
    if (priority != null)
      data.priority = priority
    if (date == null)
      data.date = dayjs();
    else
      data.date = date;
    data.type = type;
    data.status = status;
    data.tags = selectedTags;
    const formData = new FormData();
    files.map((file) => {
      const newName = `incidence?${incident.id}?${Date.now()}${file.name}`
      filesString.push(newName)
      formData.append('files', file, newName);
    })
    data.files = filesString;
    await attachmentServices.uploadAttachment(formData);
    if (type && tags && status) {
      const flag = await submitTimeLine({ data, incident, addNewTimelineFunction });
      if (flag) {
        setSeverityValue('success');
        setMessageValue('new update Added Successfully');
      }
      else {
        setSeverityValue('error');
        setMessageValue('failed to add update');
      }
      setShowBanner(true);
    }
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
    const getTags = async () => {
      const getAllTags = await backendServices.getTags();
      setTags(getAllTags);
    }
    getTags();
  }, []);
  return (
    <Dialog open={open} PaperProps={{ style: { borderRadius: 20 } }} onClose={onClose} BackdropProps={{ style: backdropStyles }} scroll={'body'}>
      <div className="addUpdate" style={popupStyles}>
        <CloseIcon style={closeIconStyles} onClick={onClose} />
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
          <h2>Add Update</h2>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <label htmlFor="text">Text</label>
                <TextFieldInput placeholder="your update..." multiline rows={3}
                  size="medium"
                  {...register("text", {
                    required: "text is required",
                  })}
                />
                {errors.text && <span style={{ color: errorColor }}>{errors.text.message}</span>}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <label htmlFor="files">Files</label>
              <UploadFiles files={files} setFiles={setFiles} />
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
                    <DatePicker date={date} setDate={setDate} />
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <FormControl
                style={{ width: '100%' }}>
                <label htmlFor="type">Type</label>
                {/* <DropDown type={type} setType={setType} /> */}
                {isSubmit && !type && <span style={{ color: errorColor }}>Type is required</span>}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl
                style={{ width: '100%' }}>
                <label htmlFor="status">Status</label>
                {/* <StatusDropDown status={status} setStatus={setStatus}/> */}
                {isSubmit && !status && <span style={{ color: errorColor }}>Type is required</span>}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl style={{ width: '100%' }}>
                <label htmlFor="tags">Tags</label>
                <div id="tags">
                  <CustomAutocomplete options={tags} selectedOptions={selectedTags} setSelectedOptions={setSelectedTags} getOptionLabel={getOptionLabel} placehOlderText={"Write to add"} />
                </div>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" style={{ width: '100%' }} variant='contained'>Update</Button>
            </Grid>
          </Grid>
        </form>
      </div>
      {showBanner && (
        <BannerNotification message={messageValue} severity={severityValue} onClose={() => onClose()} />
      )}
    </Dialog>
  );
}