<<<<<<< HEAD
import { createTheme } from '@mui/material/styles';
declare module '@mui/material/styles' {
  interface TypographyVariants {
    date: React.CSSProperties;
    bold: React.CSSProperties;
    normal: React.CSSProperties;
    widget: React.CSSProperties;
    longText: React.CSSProperties;
  }
  interface TypographyVariantsOptions {
    date: React.CSSProperties;
    bold: React.CSSProperties;
    normal: React.CSSProperties;
    widget: React.CSSProperties;
    longText: React.CSSProperties;
    boldGreen: React.CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    date: true;
    bold: true;
    normal: true;
    widget: true;
    longText: true;
    boldGreen: true;
  }
}
const theme = createTheme({
  palette: {
    background: {
      default: '#F1F1F1'
    },
    primary: {
      //the basic color
      light: '#2F854F1A', //light-green
      main: '#000000', //black
      dark: '#000000',
      contrastText: '#FFFFFF',
    },
    secondary: {
      light: '#2F854F1A', //light-green
      main: '#2F854F', //green
      dark: '#D9D9D9',
      contrastText: '#FFFFFF',
    },
    success: {
      light: '#4CAF50',
      main: '#2E7D32',
      dark: '#1B5E20',
      contrastText: '#fff'
    },
    error: {
      light: '#EF5350',
      dark: '#C62828',
      main: '#D32F2F',
      contrastText: '#fff'
    },
    warning: {
      light: '#FF9800',
      dark: '#E65100',
      main: '#ED6C02',
      contrastText: '#fff'
    },

    info: {
      light: '#D9D9D9',
      dark: '#D9D9D9',
      main: '#D9D9D9', //gray
      contrastText: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: 'Poppins',
    fontSize: 15,
    date: {
      fontWeight: 400,
      fontSize: '15px',
      lineHeight: ' 22.5px',
      color: ' #5F5F5F',
      display: 'block',
    },
    widget: {
      fontWeight: 400,
      fontSize: '46.32px',
      lineHeight: '69.48px',
      display: 'flex',
      paddingTop: '15px',
    },
    bold: {
      fontWeight: 500,
      fontSize: '18px',
      lineHeight: '27px',
      display: 'block',
    },
    normal: {
      fontStyle: 'normal',
      fontWeight: 100,
      lineHeight: 'normal',
    },
    longText: {
      width: '80%',
      paddingBlock: '30px',
      lineHeight: '35.79px',
      display: 'block',
    },
    boldGreen: {
      fontWeight: 700,
      lineHeight: '36px',
      letterSpacing: '0em',
      color: '#2F854F',
      paddingTop: '3%',
      display: 'block'
=======
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
    typography: {
        fontFamily: 'Poppins',
        fontSize: 15,
        // fontWeight: 500,
        //  lineHeight: 23,
        //  letterSpacing: 0,
      },
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
>>>>>>> origin
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          width: '176px',
          height: '48px',
          justifyContent: 'left',
          textTransform: 'capitalize',
          transition: 'background-color 0.3s', // נוסיף אנימציה לשינוי הצבע בעת hover
          '&:hover': {
            backgroundColor: '#2F854F1A',
            color: '#2E7D32'
          },
        },
      },
      variants: [
        {
          props: { variant: 'outlined' },
          style: {
            border: `1px solid #2F854F`,
            backgroundColor: '#FFFFFF',
            color: 'black',
            width: '176px',
            height: '48px',
            textTransform: 'capitalize',
            marginBottom: '2%',
            transition: 'background-color 0.3s', // נוסיף אנימציה לשינוי הצבע בעת hover
            '&:hover': {
              backgroundColor: '#2F854F1A',
              color: '#2E7D32'
            },
          },
        },
        {
          props: { variant: 'contained' },
          style: {
            backgroundColor: '#2F854F',
            color: '#FFFFFF',
            width: '176px',
            height: '48px',
            justifyContent: 'center',
            textTransform: 'capitalize',
            transition: 'background-color 0.3s', // נוסיף אנימציה לשינוי הצבע בעת hover
            '&:hover': {
              backgroundColor: '#2F854F1A',
              color: '#2E7D32'
            },
          },
        },
      ],
    }
  }
})
<<<<<<< HEAD

export default theme;
=======
export default theme
>>>>>>> origin
