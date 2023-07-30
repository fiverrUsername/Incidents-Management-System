import React, { useEffect, useState } from 'react';
import { Dialog, FormControl, InputLabel, Grid, Button, AlertColor } from "@mui/material";
import { useForm } from 'react-hook-form';
import CloseIcon from '@mui/icons-material/Close';
import DateTimePickerValue from '../datePicker/datePicker';
import TextFieldInput from '../AddIncident/TextFields'
import ToggleButtons from '../AddIncident/PriorityButtons';
import DropDown from '../AddIncident/DropDown';
import CustomAutocomplete from '../autoCompleteTag/autoComplete';
import dayjs from 'dayjs';
import Option from '../../interface/IOption';
import submitTimeLine from './submitTimeLine'
import theme from '../../theme';
import apiCalls from '../../service/apiCalls';
import BannerNotification from "../bannerNotification/BannerNotification"
import { text } from 'node:stream/consumers';
import IIncident from '../../interface/incidentInterface';
import TypesSelect, { Types } from '../AddIncident/Types';
import { ITag } from '../../interface/ITag';
import { Tag } from 'styled-components/dist/sheet/types';
import UploadFiles from '../uploadFiles/UploadFiles';
import awsService from '../../service/awsService';
export interface form_data {
  text: string;
  priority: string;
  date: dayjs.Dayjs;
  type: string;
  tags: ITag[];
  files: string[];
} 

export interface GetIncident {
  _id: string;
  id: string;
  name: string;
  status: string;
  description: string;
  currentPriority: string;
  type: string;
  durationHours: number;
  channelId?:string;
  slackLink: string;
  channelName?: string;
  currentTags: ITag[];
  date: string;
  createdAt: string;
  updatedAt: string;
  cost: number;
  createdBy: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  incident: GetIncident;
}

export default function AddUpdate({ open, onClose, incident }: Props) {
  //const priorityProp = incident.currentPriority;
  const { handleSubmit, register, formState: { errors } } = useForm<form_data>();
  const [priority, setPriority] = React.useState<string | null>("");
  const [date, setDate] = React.useState<dayjs.Dayjs | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [type, setType] = React.useState(incident.type);
  const [tags, setTags] = useState<ITag[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [filesString, setFilesString] = useState<string[]>([]);
  const [severityValue, setSeverityValue] = useState<AlertColor>('error');
  const [messageValue, setMessageValue] = useState<string>("");
  const [text, setText] = useState<string>();

  const [selectedTags, setSelectedTags] = useState<ITag[]>(incident.currentTags);

  async function onSubmit(data: form_data) {
    setIsSubmit(true);
    if (priority != null)
      data.priority = priority
    if (date == null)
      data.date = dayjs();
    else
      data.date = date;
    data.type = type;
    data.tags = selectedTags;
    data.files = filesString;
    const formData = new FormData();
    files.map((file)=>{
      console.log(incident)
      const newName = `incidence_${incident.id}_${file.name}`
      setFilesString([...filesString, newName]);
      console.log("-----", newName)
      formData.append('files', file, newName);
    })
    await awsService.uploadAttachment(formData);
        if (type && tags) {
      const flag = await submitTimeLine({ data, incident });
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
      const getAllTags = await apiCalls.getTags();
      setTags(getAllTags);
    }
    getTags();
    setPriority(String(priority).toLowerCase());
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
                    <DateTimePickerValue date={date} setDate={setDate} />
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <FormControl
                style={{ width: '100%' }}>
                <label htmlFor="type">Type</label>
                <DropDown type={type} setType={setType} />
                {isSubmit && !type && <span style={{ color: errorColor }}>Type is required</span>}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl style={{ width: '100%' }}>
                <label htmlFor="tags">Tags</label>
                <div id="tags">
                  <CustomAutocomplete options={tags} selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
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
