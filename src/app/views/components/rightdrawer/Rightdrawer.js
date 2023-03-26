import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import { Button, IconButton, useMediaQuery } from '@mui/material';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default function TemporaryDrawer() {
  const [state, setState] = React.useState({
    right: false,
  });
  const isMobile = useMediaQuery('(max-width:599px)');

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box sx={{paddingLeft:'8%', paddingRight:'8%', maxWidth:380 }}>
      <IconButton onClick={toggleDrawer(anchor, false)} style={{color:'black', top: '0', left: '0', position: 'absolute'}}><CloseIcon/></IconButton>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh'}}
      > 
        <Grid item xs={3} >
          <img style={{marginLeft:'25%'}} src="https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/a023a017672c2488.svg"></img>
          <Typography sx={{marginBottom:'8%', marginTop:'4%'}}>
            <b>Ajoutez des articles pour commencer un panier</b>
          </Typography>
          <Typography align="center">
            Une fois que vous avez ajouté des bières d'une brasserie ou les articles d'une brasserie, votre panier s'affiche ici.
          </Typography>
        </Grid>   
      </Grid> 
    </Box>
  );

  return (
    
    <div >
      {['right'].map((anchor) => (
        <React.Fragment key={anchor} >
          {!isMobile && ( 
            <Button
              disableElevation
              onClick={toggleDrawer(anchor, true)}
              variant="contained"
              color="dark"
              size="large"
              sx={{
                textTransform: 'none',
                borderRadius: '50px',
                inlineSize: 'max-content',
                fontSize: { xs: '13px', sm: '13px' },
                padding: { xs: '5px', sm: '10px' },
              }}
            >
              <ShoppingCartIcon sx={{ mr: 1 }} />
              0 paniers
            </Button>
          )}
          {isMobile && ( 
            <Button
              disableElevation
              onClick={toggleDrawer(anchor, true)}
              variant="contained"
              color="dark"
              sx={{
              borderRadius: '50px',
              }}
            >
              <ShoppingCartIcon fontSize="small" />
            </Button>
          )}
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