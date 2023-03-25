import * as React from 'react';
import { useMediaQuery, AppBar, Box, Toolbar, Typography, Button, styled, InputBase, IconButton } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles';

import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';

import Leftdrawer from '../leftdrawer/Leftdrawer'
import Rightdrawer from '../rightdrawer/Rightdrawer';

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

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '50px',
  backgroundColor: '#EEEEEE',
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(5),
    marginRight: theme.spacing(5),
    width: '40%',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 1),
    fontSize:'14px',
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: '100%',
  },
}));




export default function ButtonAppBar() {
  const isMobile = useMediaQuery('(max-width:600px)');
  
  return (
    <>
    <ThemeProvider theme={theme}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static" color="transparent" elevation={0}>
            <Toolbar>
              <IconButton
                disableRipple
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
              >
                <Leftdrawer />
              </IconButton>
              {!isMobile && ( 
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: "flex", mr: 1 }}>
                  <h6 style={{display: 'inline-block', fontSize:'6vh', margin:'0' }}>U</h6><h6 style={{color: '#06C167', display: 'inline-block', fontSize:'6vh', margin:'0' }}>beer</h6>
                </Typography> 
              )}
              {isMobile && ( 
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: "flex", mr: 1 }}>
                  <h6 style={{display: 'inline-block', fontSize:'3vh', margin:'0' }}>U</h6><h6 style={{color: '#06C167', display: 'inline-block', fontSize:'3vh', margin:'0' }}>beer</h6>
                </Typography> 
              )}
              {!isMobile && ( <Button disableElevation variant="contained" color="grey"  size="large" sx={{textTransform: 'none', borderRadius: '50px', fontSize:'13px'}}><LocationOnIcon sx={{mr:1}}/> 16 Bd Général de Gaulle • Maintenant</Button>)}
                <Search sx={{mr: 1}}>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Brasserie, bière, etc."
                    inputProps={{ 'aria-label': 'search' }}
                  />
                </Search>
              <Rightdrawer/>
            </Toolbar>
          </AppBar>
        </Box>
      </ThemeProvider>
    </>
  );
}