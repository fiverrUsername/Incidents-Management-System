import { ThemeProvider } from "@emotion/react";
import { Box, CssBaseline } from "@mui/material";
import { AiOutlineSetting } from "react-icons/ai";
import { BiHome, BiHomeHeart, BiMessageAdd } from "react-icons/bi";
import "./App.css";
import LeftDrawer, { IIcon } from "./components/drawer/Drawer";
import theme from "./theme";
import React from "react";
import TimeLinePage from "./pages/timeLine/timeLinePage";
import CustomAutocomplete from "./components/autoCompleteTag/autoComplete";

function App() {
  const tagOptions = [
    { key: "a", value: "Tag1" },
    { key: "b", value: "Tag2" },
    { key: "c", value: "Tag3" },
    { key: "d", value: "Tag4" },
  ];
  const drawerIcons: IIcon[] = [
    { icon: BiHomeHeart, text: "home", navigation: "./home" },
    { icon: BiHome, text: "dashboard", navigation: "./dashboard" },
    { icon: AiOutlineSetting, text: "settings", navigation: "./settings" },
    { icon: BiMessageAdd, text: "settings", navigation: "./message" },
  ];


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <Box sx={{ display: "flex" }}>
          <LeftDrawer icons={drawerIcons} />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            {/* <Here put all the components /> */}
         
            <TimeLinePage id={"649cbeda942a5d4d8bcf303d"}></TimeLinePage>
          </Box>
        </Box>
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
