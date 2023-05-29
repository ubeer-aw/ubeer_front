import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import Stack from '@mui/material/Stack';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from '../Auth/LoginButton';
import RegisterButton from '../Auth/RegisterButton';
import LogoutButton from '../Auth/LogoutButton';

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

export default function TemporaryDrawer() {
  const [state, setState] = React.useState({
    left: false,
  });
  const navigate = useNavigate();
  const {isAuthenticated, user } = useAuth0();

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <ThemeProvider theme={theme}>
    <Box
      sx={{ padding:'8%' }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
            { isAuthenticated ? (
              <Stack spacing={1}>
                <Button disableElevation variant="contained" color="dark"  size="large" sx={{textTransform: 'none'}} onClick={()=>navigate("/profile")}>Mon Compte</Button>
                <LogoutButton></LogoutButton>
              </Stack>
            ) : (
              <Stack spacing={1}>
                <RegisterButton></RegisterButton>
                <LoginButton></LoginButton>
              </Stack>
            )}
        
        <Button variant="text" disableElevation color="dark" size="medium" sx={{textTransform: 'none', textAlign: 'left'}} onClick={()=>navigate("/ajouter-une-brasserie")}>Ajoutez votre brasserie</Button><br></br>
        <Button variant="text" disableElevation color="dark" size="medium" sx={{textTransform: 'none', textAlign: 'left'}}>Créez un compte professionnel</Button><br></br>
        <Button variant="text" disableElevation color="dark" size="medium" sx={{textTransform: 'none', textAlign: 'left'}}>Devenez coursier-partenaire</Button>
    </Box>
    </ThemeProvider>
  );

  return (
    
    <div >
      {['left'].map((anchor) => (
        <React.Fragment key={anchor} >
          <IconButton onClick={toggleDrawer(anchor, true)}><MenuIcon sx={{ color:'black' }}/></IconButton>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}