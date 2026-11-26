import { createTheme } from '@mui/material/styles';

export const festiveFont = '"Mountains of Christmas", "Georgia", serif';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#b3202a' },
    secondary: { main: '#1f6b3a' },
    background: { default: '#0f2f22', paper: '#fffaf3' },
  },
  shape: { borderRadius: 16 },
  typography: {
    fontFamily: 'Roboto, "Helvetica Neue", Arial, sans-serif',
    h3: { fontFamily: festiveFont, fontWeight: 700 },
    h4: { fontFamily: festiveFont, fontWeight: 700 },
  },
  components: {
    MuiButton: {
      styleOverrides: { root: { textTransform: 'none', fontWeight: 700 } },
    },
  },
});
