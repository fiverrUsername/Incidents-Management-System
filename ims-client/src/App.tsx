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
            <Router/>
          </Box>
        </Box>
      </CssBaseline>
    </ThemeProvider>
  );
}
export default App;