import React from "react";
import { ThemeProvider } from "@emotion/react";
import { Box, CssBaseline } from "@mui/material";
import { AiOutlineAreaChart, AiOutlineSetting } from "react-icons/ai";
import { BiHome, BiHomeHeart, BiMessageAdd } from "react-icons/bi";
import "./App.css";
import LeftDrawer, { IIcon } from "./pages/drawer/drawer";
import theme from "./theme";
import Router from "./routes";
import { Provider } from "react-redux";
import ConfigureStoreFunction from "./redux/configureStore";

function App() {

  const store = ConfigureStoreFunction();

  const drawerIcons: IIcon[] = [
    { icon: BiHomeHeart, text: "home", navigation: "./" },
    { icon: BiHome, text: "dashboard", navigation: "./dashboard" },
    { icon: AiOutlineSetting, text: "settings", navigation: "./settings" },
    { icon: BiMessageAdd, text: "Send message", navigation: "./message" },
    { icon: AiOutlineAreaChart, text: "live status", navigation: "./liveStatus" },
  ];

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
      
        <CssBaseline>
          <Box sx={{ display: "flex" }}>
            <LeftDrawer icons={drawerIcons} />
            <Box component="main" sx={{ flexGrow: 1, p: 3, height: 'calc(100vh)', overflow: 'auto' }}>
              <Router />
            </Box>
          </Box>
        </CssBaseline>
      </ThemeProvider>
    </Provider>
  );
}
export default App;