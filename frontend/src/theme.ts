import { createTheme } from '@mui/material/styles';
import { red, orange } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: orange.A400,
    },
    secondary: {
      main: red.A200,
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
