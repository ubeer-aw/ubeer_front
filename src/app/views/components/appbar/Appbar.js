import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Leftdrawer from '../leftdrawer/Leftdrawer'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styles from './Appbar.css';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const theme = createTheme({
  status: {
    danger: '#e53e3e',
  },
  palette: {
    primary: {
      main: '#0971f1',
      darker: '#053e85',
    },
    dark: {
      main: '#000000',
      contrastText: '#fff',
    },
    grey: {
        main: '#EEEEEE',
        contrastText: '#000000',
      },
  },
});

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <IconButton
            disableRipple
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Leftdrawer />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <h6 style={{display: 'inline-block', fontSize:'2vh' }}>U</h6><h6 style={{color: '#06C167', display: 'inline-block', fontSize:'2vh' }}>beer</h6>
          </Typography>
          <ThemeProvider theme={theme}>
            <Button disableElevation variant="contained" color="grey"  size="large" sx={{textTransform: 'none', borderRadius: '50px'}}><LocationOnIcon sx={{mr:1}}/> 16 Bd Général de Gaulle • Maintenant</Button>
            <Button disableElevation variant="contained" color="dark"  size="large" sx={{textTransform: 'none', borderRadius: '50px'}}><ShoppingCartIcon sx={{mr:1}}/> panier</Button>
          </ThemeProvider>
        </Toolbar>
      </AppBar>
    </Box>
  );
}