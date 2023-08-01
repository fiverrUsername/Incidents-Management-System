import React, { useEffect, useState } from 'react';
import { Dialog, FormControl, Grid, Button } from "@mui/material";
import { useForm } from 'react-hook-form';
import CloseIcon from '@mui/icons-material/Close';
import dayjs from 'dayjs';
import DateTimePickerValue from '../datePicker/datePicker';
import TextFieldInput from './TextFields';
import ToggleButtons from './PriorityButtons';
import DropDown from './DropDown';
import CustomAutocomplete from '../autoCompleteTag/autoComplete';
import IOption from '../../interface/IOption';
import submitIncident from '../submitIncident/submitIncident';
import theme from '../../theme';
import apiCalls from '../../service/apiCalls';
import { ITag } from '../../interface/ITag';
import BannerNotification from "../bannerNotification/BannerNotification"
import { Priority } from '../../interface/enum-priority';
export interface FormData {
  name: string;
  description: string;
  priority: Priority;
  date: dayjs.Dayjs;
  ChannelId:string;
  
  // slackLink:string;
  channelName: string;
  type: string;
  tags: ITag[];
}
interface Props {
  open: boolean;
  onClose: () => void;
}

export default function AddIncident({ open, onClose }: Props) {
  const { handleSubmit, register, formState: { errors } } = useForm<FormData>();
  const [priority, setPriority] = React.useState<Priority>(Priority.P0);
  const [date, setDate] = React.useState<dayjs.Dayjs | null>(null);
  const [type, setType] = React.useState('');
  const [selectedTags, setSelectedTags] = useState<ITag[]>([]);
  const [tags, setTags] = useState<ITag[]>([]);
  const [showBanner, setShowBanner] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const getOptionLabel = (option: ITag) => option.name;

  function onSubmit(data: FormData) {
    setIsSubmit(true);
    if (priority != null)
      data.priority = priority

    if (date == null)
      data.date = dayjs();
    else
      data.date = date
    data.type = type
    data.tags = selectedTags
    if (type && tags) {
      submitIncident(data)
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

  // const validatechannelName = (value: string) => {
  //   if (!value) {
  //     return 'Slack Channel Link is required';
  //   }

  //   try {
  //     new URL(value);
  //   } catch (error) {
  //     return 'Invalid Slack Channel Link';
  //   }

  //   return undefined;
  // };

  const validatechannelName = (value:string) => {
    const minLength = 1;
    const maxLength = 80;
    const allowedCharacters = /^[a-zA-Z0-9-_]+$/;

    //TODO- GetAllChannelsNames from slack server
    const reservedNames = ["general", "random", "all"]; 
  
    if (!value) {
      return "Slack Channel Name is required";
    }
  
    if (value.length < minLength || value.length > maxLength) {
      return "Slack Channel Name must be between 1 and 80 characters long";
    }
  
    if (!allowedCharacters.test(value)) {
      return "Invalid characters";
    }
  
    if (reservedNames.includes(value.toLowerCase())) {
      return "The channel name is already exists";
    }
  
  
    return true;
  };
  
  


  const validatechannelId = (value: string) => {
    if (!value) {
      return 'Slack Channel Id is required';
    }

    try {
      new URL(value);
    } catch (error) {
      return 'Invalid Slack Channel Id';
    }

    return undefined;
  };
  const backdropStyles: React.CSSProperties = {
    background: 'rgba(0, 48, 18, 0.84)',
  };

  useEffect(() => {
    const FetchData = async () => {
      const getAllTags = await apiCalls.getTags();
      setTags(getAllTags);
    };
    FetchData();
  }, []);

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
                <DropDown type={type} setType={setType} />
                {isSubmit && !type && <span style={{ color: errorColor }}>Type is required</span>}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl style={{ width: '100%' }}>
                <label htmlFor="tags">Tags</label>
                <div id="tags">
                <CustomAutocomplete options={tags} selectedOptions={selectedTags} setSelectedOptions={setSelectedTags} getOptionLabel={getOptionLabel} placehOlderText={"Write to add"}/>
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
        <BannerNotification message="Incident Added Successfully" severity="success" onClose={() => onClose()} />
      )}
    </Dialog>
  );
}
