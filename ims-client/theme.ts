import { colors } from '@mui/material'
import { createTheme } from '@mui/material/styles'
import React, { useContext } from 'react'
const theme = createTheme({

    palette: {
      //לבן
        primary: {
           light: '#aa00ff',
          main: '#FFFFFF',  //הצבע הראשי
         dark: '#aa00ff',
          contrastText: '#aa00ff',
         
        },
        //אפור
        secondary: {
            light: '#aa00ff',
            main: '#D9D9D9',
            dark: '#aa00ff',
            contrastText: '#FFFFFF',
          },
          success: {
            light: '#4caf50',
            main: '#2e7d32',
            dark: '#1b5e20',
            contrastText:'#fff'
          },
          error: {
            light: '#ef5350',
            dark: '#c62828',
            main: '#d32f2f',
            contrastText:'#fff'
          },
          warning:{
            light: '#ff9800',
            dark: '#e65100',
            main: '#ed6c02',
            contrastText:'#fff'
          },
          //???
          info: {
            light: '#aa00ff',
            dark: '#aa00ff',
            main: '#aa00ff',
            contrastText:'#FFFFFF',
          },
        },
    // typography: {
    //     fontFamily: 'Poppins',
    //     fontSize: 15,
    //     // fontWeight: 500,
    //     //  lineHeight: 23,
    //     //  letterSpacing: 0,
    //   },
      components: {
        MuiButton: {
          styleOverrides: {
            root: {
              backgroundColor:'#2F854F',
              color:'#FFFFFF',//לבן
              border:'#FFFFFF',
         
            }
            
          }
        },
    },
    
})
export default theme



