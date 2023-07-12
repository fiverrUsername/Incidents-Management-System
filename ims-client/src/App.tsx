

// import { Provider } from 'react-redux'

// import { ThemeProvider } from '@emotion/react'
// import { Box } from '@mui/material'
// import './App.css'
// import LeftDrawer, { IIcon } from './components/drawer/Drawer'
// import theme from './theme'
// import React from 'react'
// import { BiHome, BiHomeHeart, BiMessageAdd } from 'react-icons/bi';
// import { AiOutlineSetting } from 'react-icons/ai';
// import TimeLine from './pages/timeLine/timeLine'
// import DemoComponent from './demoTest/DemoComponent'



// function App() {

//   const tagOptions = [{ id: "a", name: 'Tag1' }, { id: "b", name: 'Tag2' }, { id: "c", name: 'Tag3' }, { id: "d", name: 'Tag4' }];
//   const drawerIcons: IIcon[] = [
//     { icon: BiHomeHeart, text: "home", navigation: "./home" },
//     { icon: BiHome, text: "dashboard", navigation: "./dashboard" },
//     { icon: AiOutlineSetting, text: "settings", navigation: "./settings" },
//     { icon: BiMessageAdd, text: "settings", navigation: "./message" },

//   ];

//   return (
//     <ThemeProvider theme={theme}>
//       <Box sx={{ display: 'flex' }}>
//         <LeftDrawer icons={drawerIcons} />
//         <TimeLine />
//         <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//           {/* <Here put all the components /> */}
//           {/* <AutocompleteTag tagOptions={tagOptions} ></AutocompleteTag> */}
//         </Box>
//       </Box>
//     </ThemeProvider>
//   );
// }

// export default App;
//++++++++++++++++++++++++++++++++++


import React, { useState } from 'react';
import { Button, Box, ThemeProvider } from '@mui/material';
import AddIncident from './components/AddIncident/addIncident';
import theme from './theme';
import CustomTextFild from './components/CustomTextField/CustomTextfield';
import CustomTextField from './components/CustomTextField/CustomTextfield';

import { Provider } from 'react-redux'

// import { ThemeProvider } from '@emotion/react'
import './App.css'
import LeftDrawer, { IIcon } from './components/drawer/Drawer'
import { BiHome, BiHomeHeart, BiMessageAdd } from 'react-icons/bi';
import { AiOutlineSetting } from 'react-icons/ai';
import TimeLine from './pages/timeLine/timeLine'
import DemoComponent from './demoTest/DemoComponent'

function App() {
  const [open, setOpen] = useState(false);  
  const drawerIcons: IIcon[] = [
    { icon: BiHomeHeart, text: "home", navigation: "./home" },
    { icon: BiHome, text: "dashboard", navigation: "./dashboard" },
    { icon: AiOutlineSetting, text: "settings", navigation: "./settings" },
    { icon: BiMessageAdd, text: "settings", navigation: "./message" },

  ];

  const handleClick = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
      <LeftDrawer icons={drawerIcons} />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Button onClick={handleClick}>Open Incident</Button>
          {open && <AddIncident open={open} onClose={handleClose} />}

        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;