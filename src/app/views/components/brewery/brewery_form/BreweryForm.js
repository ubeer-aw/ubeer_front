import React from 'react'
import { Box, AppBar, Toolbar, Typography, Container, TextField, Button, IconButton  } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
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
export default function BreweryForm() {
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
          name: data.get('name'),
          description: data.get('description'),
          img: data.get('img'),
        });
      };

  return (
    <div>
        <ThemeProvider theme={theme}>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" color="dark">
                    <Toolbar>
                        <IconButton color="transparent" onClick={()=>navigate("/")}>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            <h6 style={{display: 'inline-block', fontSize:'4vh', margin:'0', color:'white' }}>U</h6><h6 style={{color: '#06C167', display: 'inline-block', fontSize:'4vh', margin:'0' }}>beer</h6>
                            </Typography>
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </Box>

            
                <Container component="main" maxWidth="xs">
                    <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                    >
                    <Typography component="h1" variant="h5">
                        Ajouter une brasserie
                    </Typography>

                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                        color="dark"
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Nom de la brasserie"
                        name="name"
                        autoFocus
                        />

                        <TextField
                        color="dark"
                        margin="normal"
                        fullWidth
                        name="description"
                        label="Description de la brasserie"
                        type="text"
                        id="description"
                        />

                        <TextField
                        color="dark"
                        margin="normal"
                        required
                        fullWidth
                        name="img"
                        label="Lien vers l'image de la brasserie"
                        type="text"
                        id="img"
                        />

                        <Button
                        type="submit"
                        fullWidth
                        color="dark"
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        >
                        Ajouter
                        </Button>
                        
                    </Box>
                    </Box>
                
                </Container>




        </ThemeProvider>
    </div>
  )
}
