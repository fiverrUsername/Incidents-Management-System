


import React, { useState } from 'react';
import { Dialog, FormControl, InputLabel, Grid, Button } from "@mui/material";
import { useForm } from 'react-hook-form';
import CloseIcon from '@mui/icons-material/Close';
import DateTimePickerValue from '../datePicker/datePicker';
import TextFieldInput from './TextFields';
import ToggleButtons from './PriorityButtons';
import TypesSelect, { Types } from './Types';
import DropDown from './DropDown';
import CustomAutocomplete from '../autoCompleteTag/autoComplete';
import dayjs from 'dayjs';
import Option from '../../interface/IOption';
import submitIncident from '../submitIncident/submitIncident';
import theme from '../../theme';
export interface FormData {
  name: string;
  description: string;
  priority: string;
  date: dayjs.Dayjs;
  slackLink: string;
  type: string;
  tags: Option[];
}

interface Props {
  open: boolean;
  onClose: () => void;
}


export default function AddIncident({ open, onClose }: Props) {
  const { handleSubmit, register, formState: { errors } } = useForm<FormData>();
  const [priority, setPriority] = React.useState<string | null>('p0');
  const [date, setDate] = React.useState<dayjs.Dayjs | null>(null);
  const [type, setType] = React.useState('');
  const [selectedTags, setSelectedTags] = useState<Option[]>([]);


  function onSubmit(data: FormData) {
    if (priority != null)
      data.priority = priority
    if (date != null)
      data.date = date
    data.type = type
    data.tags = selectedTags
    console.log("selectedTags ", selectedTags)
    console.log("Form data:", data);
    submitIncident(data)
    onClose()
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
  const tagOptions: Option[] = [{ key: "a", value: 'Tag1' }, { key: "b", value: 'Tag2' }, { key: "c", value: 'Tag3' }, { key: " d", value: 'Tag4' }];
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
                  })} />
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


            <Grid item xs={12}>
              <div style={{ display: 'flex' }}>
                <Grid item xs={6}>
                  <FormControl style={{ width: '100%' }}>
                    <label htmlFor="date">Date (optional)</label>
                    <DateTimePickerValue date={date} setDate={setDate} />
                  </FormControl>
                </Grid>


                <Grid item xs={6}>
                  <FormControl style={{ width: '100%' }}>
                    <label htmlFor="slack-channel">Slack Channel Link</label>
                    <TextFieldInput
                      id="slack-channel"
                      size="small"
                      rows={1}
                      multiline
                      placeholder="Slack Channel Link"
                      {...register("slackLink", {
                        required: "Slack Channel is required",
                      })} />
                    {errors.slackLink && <span style={{ color: errorColor }}>{errors.slackLink.message}</span>}
                  </FormControl>
                </Grid>
              </div>
            </Grid>

            <Grid item xs={12}>
              <FormControl
                //  {...register("type", {
                //   required: "type is required",
                // })}
                style={{ width: '100%' }}>
                <label htmlFor="type">Type</label>
                <DropDown type={type} setType={setType} />
              </FormControl>

            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <label htmlFor="tags">Tags</label>
                <div id="tags">
                  <CustomAutocomplete options={tagOptions} selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
                </div>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" style={{ width: '100%' }}>Add</Button>
            </Grid>
          </Grid>

        </form>
      </div>
    </Dialog >
  );
}
