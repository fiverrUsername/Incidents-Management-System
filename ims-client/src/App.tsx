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
import TimeLinePage from "./pages/timeLine/timeLinePage";

function App() {

  const drawerIcons: IIcon[] = [
    { icon: BiHomeHeart, text: "home", navigation: "./home" },
    { icon: BiHome, text: "dashboard", navigation: "./dashboard" },
    { icon: AiOutlineSetting, text: "settings", navigation: "./settings" },
    { icon: BiMessageAdd, text: "settings", navigation: "./message" },
  ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <Box sx={{ display: "flex"}}>
          <LeftDrawer icons={drawerIcons} />
          <Box  component="main" sx={{ flexGrow: 1, p: 3, height: 'calc(100vh - 64px)', overflow: 'auto'  }}>
            {/* <Here put all the components /> */}
            <TimeLinePage id={"649cbeda942a5d4d8bcf303b"}></TimeLinePage>
            {/* <Router/> */}
          </Box>
        </Box>
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;

