import CloseIcon from '@mui/icons-material/Close';
import { AlertColor, Button, Dialog, FormControl, Grid, SelectChangeEvent } from "@mui/material";
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
import CustomAutocomplete, { CustomSyntheticEvent } from '../../../base/autoCompleteTag/autoComplete';
import BannerNotification from '../../../base/bannerNotification/BannerNotification';
import DateTimePickerValue from '../../../base/datePicker/datePicker';
import DropDown from '../../../base/dropDown/DropDown';
import { TypesIncident, StatusIncident } from '../../../base/dropDown/Types';
import UploadFiles from '../../../base/uploadFiles/UploadFiles';
import PriorityButtons from '../../../base/priorityButtons/priorityButtons';
import { keyDate, keyPriority, keyStatus, keyTags, keyType } from '../../../../const';

export interface dataFromForm {
  text: string;
  priority: Priority;
  date: dayjs.Dayjs;
  type: string;
  tags: ITag[];
  filesString: string[];
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
  isOpen: boolean;
  incident: receivedIncident;
  onClose: () => void;
  addNewTimelineFunction: (newTimeline: ITimeLineEvent) => void;
  updateIncidentFunction: (newIncident: receivedIncident) => void;

}


export default function AddTimelineForm({ isOpen, incident, onClose, addNewTimelineFunction,updateIncidentFunction }: Props) {

  const { handleSubmit, register, formState: { errors } } = useForm<dataFromForm>();

  const [formObject, setFormObject] = React.useState<dataFromForm>({
    text: "",
    priority: incident.currentPriority,
    date: dayjs(),
    type: incident.type,
    status: incident.status,
    tags: incident.currentTags,
    filesString: [],
  });

  const [showBanner, setShowBanner] = useState<boolean>(false);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [files, setFiles] = useState<File[]>([]);
  const [severityValue, setSeverityValue] = useState<AlertColor>('error');
  const [messageValue, setMessageValue] = useState<string>("");
  const [tags, setTags] = useState<ITag[]>([]);
 

  async function onSubmit(data: dataFromForm) {
    setIsSubmit(true);
    data.date = formObject.date;
    data.priority = formObject.priority;
    data.type = formObject.type;
    data.status = formObject.status;
    data.tags = formObject.tags;
    const formData = new FormData();
    files.map((file) => {
      const newName = `incidence?${incident.id}?${Date.now()}${file.name}`
      formObject.filesString.push(newName)
      formData.append('files', file, newName);
    })
    data.filesString = formObject.filesString;
    //await attachmentServices.uploadAttachment(formData);
    const isSuccess = await submitTimeLine({ data, incident, addNewTimelineFunction ,updateIncidentFunction});
    if (isSuccess) {
      setSeverityValue('success');
      setMessageValue('new update Added Successfully');
    }
    else {
      setSeverityValue('error');
      setMessageValue('failed to add update');
    }
    setShowBanner(true);
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
  const handleChange = async (keyType: string, event: any) => {

    setFormObject((prevFormObject) => ({
      ...prevFormObject,
      [keyType]: event
    }));
  };
  return (
    <Dialog open={isOpen} PaperProps={{ style: { borderRadius: 20 } }} onClose={onClose} BackdropProps={{ style: backdropStyles }} scroll={'body'}>
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
                <PriorityButtons keyType={keyPriority} onChangePriority={handleChange} priority={formObject.priority} />                </div>
              </FormControl>
            </Grid>
            <Grid item xs={12}  >
              <Grid spacing={2} container>
                <Grid item xs={6}>
                  <FormControl style={{ width: '100%' }}>
                    <label htmlFor="date">Date (optional)</label>
                    <DateTimePickerValue  keyType={keyDate} date={formObject.date} onDateChange={handleChange} />
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <FormControl
                style={{ width: '100%' }}>
                <label htmlFor="type">Type</label>
                <DropDown keyType={keyType} defaultValue={formObject.type} Types={TypesIncident} onChangeType={handleChange}  />
                {isSubmit && !formObject.type && <span style={{ color: errorColor }}>Type is required</span>}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl
                style={{ width: '100%' }}>
                <label htmlFor="status">Status</label>
                <DropDown keyType={keyStatus} defaultValue={formObject.status} Types={StatusIncident} onChangeType={handleChange} />
                {isSubmit && !formObject.status && <span style={{ color: errorColor }}>Status is required</span>}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl style={{ width: '100%' }}>
                <label htmlFor="tags">Affected services</label>
                <div id="tags">
                <CustomAutocomplete selectedOptions={formObject.tags} options={tags} keytype={keyTags}  onChangeOptions={handleChange} />
                  {/* {isSubmit && formObject.tags.length === 0 && <span style={{ color: errorColor }}>tags is required</span>} */}
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