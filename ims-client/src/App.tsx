import React from "react";
import { ThemeProvider } from "@emotion/react";
import { Box, CssBaseline } from "@mui/material";
import { AiOutlineSetting } from "react-icons/ai";
import { BiHome, BiHomeHeart, BiMessageAdd } from "react-icons/bi";
import "./App.css";
import LeftDrawer, { IIcon } from "./components/drawer/Drawer";
import theme from "./theme";
import Router from "./routes";
import Table from "./components/table/table";
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
            {/* <Router/> */}
            {/* <Attachmentlist id={"31363d72-886b-4aaa-8408-c6ab70188ede"} />; */}
            {/* <Attachmentlist id={"e5199b56-f440-4007-a4f8-3fecd766c1a0"} />; */}
            {/* <Attachmentlist _id={"3177dcba-2882-43f4-b809-897fcd162dc1"} />; */}
            <Attachmentlist id={"a2fb8858-4b08-4e11-a583-09a0900c88ac"} />;
            {/* <Attachmentlist id={"519e2150-c16e-495f-83fb-b13dab4bb161"} />; */}


            </Box>
        </Box>
      </CssBaseline>
    </ThemeProvider>
  );
}
export default App;