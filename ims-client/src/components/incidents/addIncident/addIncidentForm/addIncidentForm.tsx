import CloseIcon from '@mui/icons-material/Close';
import { Button, Dialog, FormControl, Grid } from "@mui/material";
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import IIncident from '../../../../interfaces/IIncident';
import { ITag } from '../../../../interfaces/ITag';
import { Priority } from '../../../../interfaces/enums';
import backendServices from '../../../../services/backendServices/backendServices';
import submitIncident from '../../../../services/functions/incident/submitIncident';
import theme from '../../../../theme';
import CustomAutocomplete from '../../../base/autoCompleteTag/autoComplete';
import BannerNotification from "../../../base/bannerNotification/BannerNotification";
import TextFieldInput from "../../../base/customTextField/TextFields";
import DateTimePickerValue from '../../../base/datePicker/datePicker';
import DropDown from '../../../base/dropDown/DropDown';
import { TypesIncident } from '../../../base/dropDown/Types';
import PriorityButtons from '../../../base/priorityButtons/priorityButtons';
import { keyTags, keyPriority, keyDate, keyStatus, keyType } from '../../../../const'
import Logger from '../../../../loggers/logger';

export interface FormFormData {

  priority: Priority;
  date: dayjs.Dayjs;
  type: string;
  tags: ITag[];
}
export interface FormData {

  name: string;
  description: string;
  priority: Priority;
  date: dayjs.Dayjs;
  ChannelId: string;
  channelName: string;
  type: string;
  tags: (string | ITag)[];
}
interface Props {
  open: boolean;
  onClose: () => void;
  incidents: IIncident[];
  setIncidents: (value: React.SetStateAction<IIncident[]>) => void;
}

export default function addIncidentForm({ open, onClose, incidents, setIncidents }: Props) {
  const { handleSubmit, register, formState: { errors } } = useForm<FormData>();
  const [tags, setTags] = useState<ITag[]>([]);
  const [showBanner, setShowBanner] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [formObject, setFormObject] = React.useState<FormFormData>({
    priority: Priority.P0,
    date: dayjs(),
    type: "",
    tags: [],

  });

  async function onSubmit(data: FormData) {
    setIsSubmit(true);
    if (formObject.priority != null)
      data.priority = formObject.priority
    if (formObject.date == null)
      data.date = dayjs();
    else
      data.date = formObject.date
    data.type = formObject.type
    data.tags = formObject.tags
    if (formObject.type && tags.length > 0) {
      const isSuccess = await submitIncident(data, incidents, setIncidents);
      setIsSuccess(isSuccess);
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


  const validatechannelName = async (value: string) => {
    const minLength = 1;
    const maxLength = 80;
    const allowedCharacters = /^[a-zA-Z0-9-_]+$/;

    let allChannelNames: string[] = [];

    try {
      const allIncidents: IIncident[] | undefined = await backendServices.getIncidents();
      allChannelNames = (allIncidents || [])
        .filter((incident: IIncident) => incident.channelName !== undefined)
        .map((incident: IIncident) => incident.channelName as string);
    } catch (error) {
      console.error('Error fetching incidents:', error);
    }

    if (!value) {
      return "Slack Channel Name is required";
    }

    if (value.length < minLength || value.length > maxLength) {
      return "Slack Channel Name must be between 1 and 80 characters long";
    }
    if (!allowedCharacters.test(value)) {
      return "Invalid characters";
    }

    if (allChannelNames.includes(value.toLowerCase())) {
      return "The channel name already exists";
    }

    return true;
  };
  const backdropStyles: React.CSSProperties = {
    background: 'rgba(0, 48, 18, 0.84)',
  };

  useEffect(() => {
    const FetchData = async () => {
      try {
        const getAllTags: ITag[] = await backendServices.getTags();
        Logger.info({ source: "Add incident Form", message: "Getting all tags success!" })
        setTags(getAllTags);
      } catch (error: any) {
        Logger.error({ source: "Add incident Form", message: "Error getting all tags" })
      }
    };
    FetchData();
  }, []);


  const handleChange = async (keyType: string, event: any) => {
    console.log(event)
    setFormObject((prevFormObject) => ({
      ...prevFormObject,
      [keyType]: event

    }));
  };
  return (
    <Dialog open={open} PaperProps={{ style: { borderRadius: 20 } }} onClose={onClose} BackdropProps={{ style: backdropStyles }} scroll={'body'}>
      <div className="addIncident" style={popupStyles}>
        <CloseIcon style={closeIconStyles} onClick={onClose} />
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
          <h2>Add Incident</h2>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <label htmlFor="name">Incident Name</label>
                <TextFieldInput placeholder="Incident Name" multiline rows={1} size="small"
                  {...register("name", {
                    required: "Name is required",
                  })}
                />
                {errors.name && <span style={{ color: errorColor }}>{errors.name.message}</span>}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <label htmlFor="description">Description</label>
                <TextFieldInput placeholder="Write about the incident..." multiline rows={3}
                  size="medium"
                  {...register("description", {
                    required: "Description is required",
                  })} />

                {errors.description && <span style={{ color: errorColor }}>{errors.description.message}</span>}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth >
                <label htmlFor="priority">Priority</label>
                <div id="priority">
                  <PriorityButtons keyType={keyPriority} onChangePriority={handleChange} priority={formObject.priority} />
                </div>
              </FormControl>
            </Grid>
            <Grid item xs={12}  >
              <Grid spacing={2} container>
                <Grid item xs={6}>
                  <FormControl style={{ width: '100%' }}>
                    <label htmlFor="date">Date (optional)</label>
                    <DateTimePickerValue keyType='string' date={formObject.date} onDateChange={handleChange} />
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl style={{ width: '100%' }}>
                    <label htmlFor="slack-channel"> Channel Name</label>
                    <TextFieldInput
                      id="slack-channel"
                      size="small"
                      rows={1}
                      multiline
                      placeholder="Slack Channel name"
                      {...register("channelName", { validate: validatechannelName })}
                    />
                    {errors.channelName && <span style={{ color: errorColor }}>{errors.channelName.message}</span>}
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <FormControl
                style={{ width: '100%' }}>
                <label htmlFor="type">Type</label>
                <DropDown keyType={keyType} defaultValue={formObject.type} Types={TypesIncident} onChangeType={handleChange} />
                {isSubmit && !formObject.type && <span style={{ color: errorColor }}>Type is required</span>}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl style={{ width: '100%' }}>
                <label htmlFor="tags">Tags</label>
                <div id="tags">
                  <CustomAutocomplete options={tags} keytype={keyTags} onChangeOptions={handleChange} />
                </div>
                {isSubmit && tags.length === 0 && <span style={{ color: errorColor }}>tags is required</span>}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" style={{ width: '100%' }} variant='contained'>Add</Button>
            </Grid>
          </Grid>
        </form>
      </div>
      {showBanner && (
        <BannerNotification
          message={isSuccess ? "Incident Added Successfully" : "Error Adding Incident"}
          severity={isSuccess ? "success" : "error"}
          onClose={() => onClose()}
        />
      )}
    </Dialog>
  );
}

