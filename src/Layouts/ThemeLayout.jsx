import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import React from 'react';

const ThemeLayout = ({ children }) => {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#3D464D',
      },
      color1: {
        main: '#326789',
      },
      color2: {
        main: '#DEDDDD',
      },
      color3: {
        main: '#FCFCFC',
      },
      color4: {
        main: '#EFF1F4',
      },
      color5: {
        main: '#F0F0F0',
      },
      color6: {
        main: '#4D7B52',
      },

      textBlack: '#070707',
      textTan: '#3D464D',
      textGray: '#A4A4A4',
      textWhite: '#FFFFFF',
    },
    typography: {
      fontFamily: ['Noto Serif Bengali Variable', 'sans-serif'].join(','),
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            //Set core body defaults
            padding: 0,
            minHeight: '100vh',
            textRendering: 'optimizeSpeed',
            backgroundColor: '#F5F5F5',

            // use fonts for non-mui components
            '*': {
              fontFamily: ['Noto Serif Bengali Variable', 'sans-serif'].join(
                ','
              ),
            },
            // Box sizing rules
            '*,*::before,*::after': {
              boxSizing: 'border-box',
            },
            // Set core root defaults
            '& html:focus-within': { scrollBehavior: 'smooth' },

            // scrollbar
            '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
              width: '10px',
            },
            '&::-webkit-scrollbar-track, & *::-webkit-scrollbar-track': {
              background: '#e0e0e0',
            },
            '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
              background: '#3D464D',
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-track:hover, & *::-webkit-scrollbar-track:hover':
              {
                background: '#e0e0e0',
              },
            '&::-selection, & *::-selection': {
              backgroundColor: 'gray',
            },

            // Remove all animations, transitions and smooth scroll for people that prefer not to see them
            ['@media (prefers-reduced-motion: reduce)']: {
              '& html:focus-within': {
                scrollBehavior: 'auto',
              },
              '*,*::before,*::after': {
                animationDuration: '0.01ms !important',
                animationIterationCount: '1 !important',
                transitionDuration: '0.01ms !important',
                scrollBehavior: 'auto !important',
              },
            },
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          h1: {
            fontStyle: 'normal',
            fontSize: '32px',
            fontWeight: '700',
            lineHeight: '38px',
            color: '#0B0B0B',
          },
          h2: {
            fontStyle: 'normal',
            fontSize: '28px',
            fontWeight: '700',
            lineHeight: '33px',
            color: '#0B0B0B',
          },
          h3: {
            fontStyle: 'normal',
            fontWeight: '700',
            fontSize: '24px',
            lineHeight: '28px',
            color: '#0B0B0B',
          },
          h4: {
            fontStyle: 'normal',
            fontWeight: '700',
            fontSize: '22px',
            lineHeight: '26px',
            color: '#0B0B0B',
          },
          h5: {
            fontStyle: 'normal',
            fontWeight: '700',
            fontSize: '18px',
            lineHeight: '21px',
            color: '#0B0B0B',
          },
          body1: {
            fontSize: '16px',
            lineHeight: '19px',
          },
          body2: {
            fontSize: '32px',
            lineHeight: '38px',
          },
        },
        variants: [
          {
            props: { variant: 'body3' },
            style: {
              display: 'block',
              fontSize: '28px',
              lineHeight: '33px',
            },
          },
          {
            props: { variant: 'body4' },
            style: {
              display: 'block',
              fontSize: '24px',
              lineHeight: '28px',
            },
          },
          {
            props: { variant: 'body5' },
            style: {
              display: 'block',
              fontSize: '22px',
              lineHeight: '26px',
            },
          },
          {
            props: { variant: 'body6' },
            style: {
              display: 'block',
              fontSize: '18px',
              lineHeight: '21px',
            },
          },
          {
            props: { variant: 'body7' },
            style: {
              display: 'block',
              fontSize: '16px',
              lineHeight: '20px',
            },
          },
        ],
      },
      MuiButton: {
        defaultProps: {
          style: {
            textTransform: 'unset',
            minWidth: 'unset',
          },
        },
        variants: [
          {
            props: { variant: 'button1' },
            style: {
              backgroundColor: '#4D7B52',
              '&:hover': {
                backgroundColor: '#4D7B52E6',
              },
            },
          },
          {
            props: { variant: 'button2' },
            style: {
              backgroundColor: '#008069',
              '&:hover': {
                backgroundColor: '#008069E6',
              },
            },
          },
          {
            props: { variant: 'button3' },
            style: {
              color: '#FFFFFF',
              backgroundColor: '#0858F7CC',
              '&:hover': {
                backgroundColor: '#0858F7B3',
              },
            },
          },
          {
            props: { variant: 'button4' },
            style: {
              backgroundColor: '#EA4335',
              '&:hover': {
                backgroundColor: '#EA4335E6',
              },
            },
          },
        ],
      },
      MuiTableHead: {
        styleOverrides: {
          root: {
            '& .MuiTableCell-root': {
              color: '#FFFFFF',
              backgroundColor: '#3B7197',
            },
          },
        },
      },
      MuiTableBody: {
        styleOverrides: {
          root: {
            '& .MuiTableCell-root': {
              color: '#0B0B0B',
              backgroundColor: '#FCFCFC',
              marginTop: '50px',
            },
            '&>*:nth-of-type(even)': {
              '& .MuiTableCell-root': {
                backgroundColor: '#EFF1F4',
              },
            },
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-notchedOutline': {
              border: 0,
            },
          },
        },
      },
      MuiToolbar: {
        defaultProps: {
          style: {
            height: '75px',
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterMoment}>
        {children}
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default ThemeLayout;
