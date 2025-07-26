import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: 'rgb(192,70,32)', // Accent color for primary
    },
    secondary: {
      main: '#000000', // Black as the secondary color
    },
    background: {
      default: '#FFFFFF', // White background
      paper: '#FFFFFF',   // White paper background
    },
    text: {
      primary: '#000000', // Black text for readability
      secondary: 'rgb(192,70,32)', // Accent color for secondary text
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif', // Customize the font family if needed
  },
});

export default theme;