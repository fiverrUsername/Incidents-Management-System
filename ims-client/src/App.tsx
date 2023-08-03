import React from "react";
import { ThemeProvider } from "@emotion/react";
import { Box, CssBaseline } from "@mui/material";
import { AiOutlineSetting } from "react-icons/ai";
import { BiHome, BiHomeHeart, BiMessageAdd } from "react-icons/bi";
import "./App.css";
import LeftDrawer, { IIcon } from "./components/drawer/Drawer";
import theme from "./theme";
import Router from "./routes";
import Attachmentlist from "./components/attachment/attachmentList";

function App() {
  const drawerIcons: IIcon[] = [
    { icon: BiHomeHeart, text: "home", navigation: "./" },
    { icon: BiHome, text: "dashboard", navigation: "./dashboard" },
    { icon: AiOutlineSetting, text: "settings", navigation: "./settings" },
    { icon: BiMessageAdd, text: "Send message", navigation: "./message" },
  ];
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <Box sx={{ display: "flex"}}>
          <LeftDrawer icons={drawerIcons} />
          <Box  component="main" sx={{ flexGrow: 1, p: 3, height: 'calc(100vh)', overflow: 'auto'  }}>
            {/* <Here put all the components /> */}
            <Attachmentlist id={"e850d073-44a4-4549-9cfd-066936cf02c5"} />;

            {/* <Router/> */}
          </Box>
        </Box>
      </CssBaseline>
    </ThemeProvider>
  );
}
export default App;