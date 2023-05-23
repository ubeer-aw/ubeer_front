import React, {useCallback } from 'react';
import { useMediaQuery, AppBar, Box, Toolbar, Typography, Button, styled, InputBase, IconButton } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles';

import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';

import Leftdrawer from '../leftdrawer/Leftdrawer'
import Rightdrawer from '../rightdrawer/Rightdrawer';

import { useNavigate } from 'react-router-dom';

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




export default function ButtonAppBar({ name, onNameChange }) {
  const isMobile = useMediaQuery('(max-width:800px)');
  const navigate = useNavigate();

  const handleInputChange = useCallback(event => {
    onNameChange(event.target.value)
  }, [onNameChange])

  return (
    <>
    <ThemeProvider theme={theme}>
        <Box >
          <AppBar position="static" color="transparent" elevation={0} >

            <Toolbar style={{ display: 'flex' }}>

              <Leftdrawer />

              {!useMediaQuery('(max-width:600px)') && ( 
                <IconButton style={{ marginRight: 'auto' }} disableRipple onClick={()=>navigate("/")}>
                    
                      <h6 style={{color:'black', fontSize:'4vh', margin:'0'  }}>U</h6>
                      <h6 style={{color: '#06C167', fontSize:'4vh', margin:'0' }}>beer</h6>
                    
                </IconButton>
              )}

              {useMediaQuery('(max-width:600px)') && ( 
                <IconButton style={{ marginRight: 'auto' }} onClick={()=>navigate("/")}>
                  <h6 style={{color:'black', fontSize:'3vh', margin:'0'  }}>U</h6>
                  <h6 style={{color: '#06C167', fontSize:'3vh', margin:'0' }}>beer</h6>
                </IconButton>
              )}

              {!useMediaQuery('(max-width:800px)') && ( 
                <Button disableElevation variant="contained" color="grey" size="large"sx={{ textTransform: 'none', borderRadius: '50px', fontSize: '0.8rem', whiteSpace: 'nowrap', overflow: 'hidden', '@media (max-width: 900px)': { fontSize: '0.6rem' }}}>
                  <LocationOnIcon fontSize="small" sx={{mr:1}}/> 16 Bd Général de Gaulle • Maintenant
                </Button>
              )}

              {!useMediaQuery('(max-width:800px)') && ( 
                <Search sx={{mr: 1}}>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Brasserie, bière, etc."
                  inputProps={{ 'aria-label': 'search' }}
                  onChange={handleInputChange} value={name}
                />
                </Search>
              )}

              {useMediaQuery('(max-width:800px)') && ( 
                <Search sx={{mr: 1}}>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Brasserie, bière, etc."
                  inputProps={{ 'aria-label': 'search' }}
                  onChange={handleInputChange} value={name}
                />
                </Search>
 
              )}
              

              <Rightdrawer />

            </Toolbar>

          </AppBar>
        </Box>
      </ThemeProvider>
    </>
  );
}