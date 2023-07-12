


// import React from 'react';
// import { Dialog, FormControl, Input, FormHelperText, Button, RadioGroup, FormControlLabel, Radio, Select, MenuItem, Grid, Paper } from "@mui/material";
// import { useForm } from 'react-hook-form';
// import { DatePicker } from "@mui/lab";
// import { GridCloseIcon } from '@mui/x-data-grid';
// import { TagsInput } from "react-tag-input-component";
// import ToggleButtons from './ToggleButtons';
// import { Label } from '@mui/icons-material';
// import CustomTextField from '../CustomTextField/CustomTextfield';
// import DateTimePickerValue from './datePicker';
// interface FormData {
//     name: string;
//     description: string;
//     priority: string;
//     date: string;
//     type: string;
//     tags: string[];
// }

// interface Props {
//     open: boolean;
//     onClose: () => void;
// }




// export default function AddIncident({ open, onClose }: Props) {
//     const { handleSubmit, register, formState: { errors } } = useForm<FormData>();

//     function onSubmit(data: FormData) {
//         console.log("Form data:", data);
//     }
//     const closeIconStyles: React.CSSProperties = {
//         width: '17px',
//         height: '17px',
//         flexShrink: 0,
//         strokeWidth: '1px',
//         stroke: '#000',
//         position: 'absolute',
//         top: '20px',
//         right: '20px',
//         cursor: 'pointer',
//     };
//     const popupStyles: React.CSSProperties = {
//         background: '#FFF',
//         display: 'inline-flex',
//         padding: '30px 31px',
//         flexDirection: 'column',
//         alignItems: 'flex-start',
//         gap: '20px',

//         maxWidth: '100%',
//         height: '981px',
//         top: '80px',
//         border: '2px solid #000',
//         overflow: 'hidden',
//     };

//     const backdropStyles: React.CSSProperties = {
//         background: 'rgba(0, 48, 18, 0.84)',
//     };



//     return (
//         <Dialog open={open} PaperProps={{
//             style: { borderRadius: 20 }
//         }} onClose={onClose} BackdropProps={{ style: backdropStyles }} scroll={'body'}>

//             {/* <div className="addIncident" style={{ ...popupStyles, borderRadius: '20px', flexDirection: 'column', justifyContent: 'space-between' }}> */}
//             <div className="addIncident" style={{ ...popupStyles, borderRadius: '20px' }}>
//                 <GridCloseIcon style={closeIconStyles} onClick={onClose} />
//                 <h1>Add Incident</h1>
//                 <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>

//                     <Grid container spacing={8}>
//                         <Grid item xs={12}>
//                             <FormControl fullWidth>
//                                 <label htmlFor="name">Incident Name</label>
//                                 <CustomTextField
//                                     id="name"
//                                     size="small"
//                                     {...register("name", {
//                                         required: "Name is required",
//                                         maxLength: { value: 20, message: "Name should not exceed 20 characters" },
//                                     })}
//                                     placeholder="Enter Incident Name"
//                                 />
//                                 {errors.name && <span>{errors.name.message}</span>}
//                             </FormControl>
//                         </Grid>




//                         <Grid item xs={12}>
//                             <FormControl fullWidth>
//                                 <label htmlFor="description">Description</label>
//                                 <CustomTextField
//                                     id="description"
//                                     size="medium"
//                                     {...register("description")}
//                                     placeholder="Write about the incident..."
//                                 />
//                             </FormControl>
//                         </Grid>

//                         <Grid item xs={12}>
//                             <FormControl fullWidth>
//                                 <label htmlFor="priority">Priority</label>
//                                 <ToggleButtons></ToggleButtons>
//                             </FormControl>
//                         </Grid>

//                         <Grid item xs={12}>
//                             <FormControl fullWidth>
//                                 <label htmlFor="date">Date</label>
//                                 <DateTimePickerValue value={null} setValue={() => console.log("date picker")} />
//                             </FormControl>
//                         </Grid>

//                         <Grid item xs={12}>
//                             <FormControl fullWidth>
//                                 <label htmlFor="type">Type</label>
//                                 {/* Type select */}
//                             </FormControl>
//                         </Grid>

//                         <Grid item xs={12}>


//                             <FormControl fullWidth>
//                                 {/* <label htmlFor="tags">Tags</label> */}
//                                 <label htmlFor="tags">Tags</label>

//                                 <TagsInput
//                                     value={["aaa"]}
//                                     onChange={() => console.log("i am on change")}
//                                     name="incidentTags"
//                                     placeHolder="enter tag"
//                                 />
//                             </FormControl>
//                         </Grid>
//                         <Grid  item xs={12}>
//                             <Button type="submit" style={{ width: '100%' }} >Add</Button>
//                         </Grid>
//                     </Grid>
//                 </form>
//             </div>
//         </Dialog >
//     );
// }
//++++++++++++++++++++++++++++++++++++++++++++++++++++
// with size in the textField
// import React from 'react';
// import { Dialog, FormControl, InputLabel, Grid, Button } from "@mui/material";
// import { useForm } from 'react-hook-form';
// import CustomTextField from '../CustomTextField/CustomTextfield';
// import { GridCloseIcon } from '@mui/x-data-grid';
// import ToggleButtons from './ToggleButtons';
// // import DateTimePickerValue from './DateTimePickerValue';
// import { TagsInput } from "react-tag-input-component";
// import DateTimePickerValue from './datePicker';

// interface FormData {
//   name: string;
//   description: string;
//   priority: string;
//   date: string;
//   type: string;
//   tags: string[];
// }

// interface Props {
//   open: boolean;
//   onClose: () => void;
// }

// export default function AddIncident({ open, onClose }: Props) {
//   const { handleSubmit, register, formState: { errors } } = useForm<FormData>();

//   function onSubmit(data: FormData) {
//     console.log("Form data:", data);
//   }

//   const closeIconStyles: React.CSSProperties = {
//     width: '17px',
//     height: '17px',
//     flexShrink: 0,
//     strokeWidth: '1px',
//     stroke: '#000',
//     position: 'absolute',
//     top: '20px',
//     right: '20px',
//     cursor: 'pointer',
//   };

//   const popupStyles: React.CSSProperties = {
//     background: '#FFF',
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'flex-start',
//     gap: '20px',
//     padding: '30px 31px',
//     borderRadius: '20px',
//   };

//   const backdropStyles: React.CSSProperties = {
//     background: 'rgba(0, 48, 18, 0.84)',
//   };

//   return (
//     <Dialog open={open} PaperProps={{ style: { borderRadius: 20 } }} onClose={onClose} BackdropProps={{ style: backdropStyles }} scroll={'body'}>
//       <div className="addIncident" style={popupStyles}>
//         <GridCloseIcon style={closeIconStyles} onClick={onClose} />
//         <h1>Add Incident</h1>
//         <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
//           <Grid container spacing={2}>
//             <Grid item xs={12}>
//               <FormControl fullWidth>
//                 <label htmlFor="name">Incident Name</label>
//                 <CustomTextField
//                   id="name"
//                   size="small"
//                   {...register("name", {
//                     required: "Name is required",
//                     maxLength: { value: 20, message: "Name should not exceed 20 characters" },
//                   })}
//                   placeholder="Enter Incident Name"
//                 />
//                 {errors.name && <span>{errors.name.message}</span>}
//               </FormControl>
//             </Grid>

//             <Grid item xs={12}>
//               <FormControl fullWidth>
//                 <label htmlFor="description">Description</label>
//                 <CustomTextField
//                   id="description"
//                   size="medium"
//                   {...register("description")}
//                   placeholder="Write about the incident..."
//                 />
//               </FormControl>
//             </Grid>

//             <Grid item xs={12}>
//               <FormControl fullWidth>
//                 <label htmlFor="priority">Priority</label>
//                 <ToggleButtons />
//               </FormControl>
//             </Grid>

//             <Grid item xs={12}>
//               <FormControl fullWidth>
//                 <label htmlFor="date">Date</label>
//                 <DateTimePickerValue value={null} setValue={() => console.log("date picker")} />
//               </FormControl>
//             </Grid>

//             <Grid item xs={12}>
//               <FormControl fullWidth>
//                 <label htmlFor="type">Type</label>
//                 {/* Type select */}
//               </FormControl>
//             </Grid>

//             <Grid item xs={12}>
//               <FormControl fullWidth>
//                 <label htmlFor="tags">Tags</label>
//                 <TagsInput
//                   value={["aaa"]}
//                   onChange={() => console.log("i am on change")}
//                   name="incidentTags"
//                   placeHolder="enter tag"
//                 />
//               </FormControl>
//             </Grid>
//           </Grid>
//           <Button type="submit" style={{ width: '100%' }}>Add</Button>
//         </form>
//       </div>
//     </Dialog>
//   );
// }
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++

import React from 'react';
import { Dialog, FormControl, InputLabel, Grid, Button } from "@mui/material";
import { useForm } from 'react-hook-form';
import CustomTextField from '../CustomTextField/CustomTextfield';
import { GridCloseIcon } from '@mui/x-data-grid';
// import DateTimePickerValue from './DateTimePickerValue';
import { TagsInput } from "react-tag-input-component";
import DateTimePickerValue from './datePicker';
import TextFieldInput from './TextFields';
import ToggleButtons from './PriorityButtons';
import TypesSelect, { Types } from './Types';
import DropDown from './DropDown';
import { Paper } from '@mui/material';

interface FormData {
  name: string;
  description: string;
  priority: string;
  date: string;
  type: string;
  tags: string[];
}

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function AddIncident({ open, onClose }: Props) {
  const { handleSubmit, register, formState: { errors } } = useForm<FormData>();

  function onSubmit(data: FormData) {
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
              <FormControl fullWidth>
                <label htmlFor="priority">Priority</label>
                <ToggleButtons />
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <label htmlFor="date">Date</label>
                <DateTimePickerValue value={null} setValue={() => console.log("date picker")} />
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              {/* <FormControl fullWidth>
                <label htmlFor="type">Type</label>
                <select id="type" {...register("type")}>
                  {Types.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </FormControl> */}

              <FormControl>
                <label htmlFor="type">Type</label>

                {/* <TypesSelect value="" onChange={(value) => console.log(value)}  style={ width: '50%' }/> */}
                {/* <DropDown PaperProps={{ style: { width: '50%' } }}></DropDown> */}


                <Paper style={{ width: '50%' }}>
                  <DropDown />
                </Paper>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <label htmlFor="tags">Tags</label>
                <TagsInput
                  value={["aaa"]}
                  onChange={() => console.log("i am on change")}
                  name="incidentTags"
                  placeHolder="enter tag"
                />
              </FormControl>
            </Grid>
          </Grid>
          <Button type="submit" style={{ width: '100%' }}>Add</Button>
        </form>
      </div>
    </Dialog>
  );
}