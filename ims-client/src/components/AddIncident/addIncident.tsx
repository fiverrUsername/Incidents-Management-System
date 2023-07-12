import React,{useState} from 'react';
import { Dialog, FormControl, InputLabel, Grid, Button } from "@mui/material";
import { useForm } from 'react-hook-form';
import CustomTextField from '../CustomTextField/CustomTextfield';
import { GridCloseIcon } from '@mui/x-data-grid';
import { TagsInput } from "react-tag-input-component";
import DateTimePickerValue from './datePicker';
import TextFieldInput from './TextFields';
import ToggleButtons from './PriorityButtons';
import TypesSelect, { Types } from './Types';
import DropDown from './DropDown';
import { Paper } from '@mui/material';
import AutocompleteTag from '../autoCompleteTag/autoCompleteTag';
import dayjs from 'dayjs';

interface FormData {
  name: string;
  description: string;
  priority: string;
  date: dayjs.Dayjs;
  slackLink:string;
  type: string;
  tags: Tag[];
}
export interface Tag{
  id: string;
  name: string;
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
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  

  function onSubmit(data: FormData) {
    if(priority!=null)
      data.priority=priority
    if(date!=null)
      data.date=date
    data.type=type
    data.tags=selectedTags
    console.log("Form data:", data);
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
const tagOptions:Tag[] = [{ id: "a", name: 'Tag1' }, { id: "b", name: 'Tag2' }, { id: "c", name: 'Tag3' }, { id: " d", name: 'Tag4' }];

  return (
    <Dialog open={open} PaperProps={{ style: { borderRadius: 20 } }} onClose={onClose} BackdropProps={{ style: backdropStyles }} scroll={'body'}>
      <div className="addIncident" style={popupStyles}>
        <GridCloseIcon style={closeIconStyles} onClick={onClose} />
        <h1>Add Incident</h1>
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <label htmlFor="name">Incident Name</label>
                <TextFieldInput
                  id="name"
                  size="small"
                  {...register("name", {
                    required: "Name is required",
                    maxLength: { value: 20, message: "Name should not exceed 20 characters" },
                  })}
                  placeholder="Enter Incident Name"
                />
                {errors.name && <span>{errors.name.message}</span>}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <label htmlFor="description">Description</label>
                <TextFieldInput
                  id="description"
                  size="medium"
                  {...register("description")}
                  placeholder="Write about the incident..."
                />
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
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={6}>
                  <FormControl style={{ width: '100%'}}>
                    <label htmlFor="date">Date (optional)</label>
                    <div id="date">
                      <DateTimePickerValue date={date} setDate={setDate} />
                    </div>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl style={{ width: '100%' }}>
                    <label htmlFor="slack-channel">Slack Channel Link</label>
                    <TextFieldInput
                      id="slack-channel"
                      size="small"
                      placeholder="Slack Channel Link"
                      {...register("slackLink")}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <FormControl style={{width:'100%'}}>
                <label htmlFor="type">Type</label>
                    <DropDown type={type} setType={setType}/>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <label htmlFor="tags">Tags</label>
                <div id="tags">
                  <AutocompleteTag tagOptions={tagOptions} selectedTags={selectedTags} setSelectedTags={setSelectedTags}/>
                </div>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
            <Button type="submit" style={{ width: '100%' }}>Add</Button>
          </Grid>
          </Grid>
          
        </form>
      </div>
    </Dialog>
  );
}

