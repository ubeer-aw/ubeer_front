import React from 'react'
import { Box, AppBar, Toolbar, Typography, Container, TextField, Button, IconButton  } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate, useParams } from 'react-router-dom';
import { addBrewery } from '../../../../service/brewery.service';
import CloseIcon from '@mui/icons-material/Close';

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
export default function ProductForm() {
    const navigate = useNavigate();
    const params = useParams()
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const jsonBrewery = {
          "name": data.get('name'),
          "description": data.get('description'),
          "img": data.get('img'),
          "stars": data.get('stars'),
        }
        const result = await addBrewery(jsonBrewery)
        console.log(result)
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
            <IconButton onClick={()=>navigate("/brasserie/" + params.id)}><CloseIcon/></IconButton>
            
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
                        Ajouter un produit à votre brasserie
                    </Typography>

                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                        color="dark"
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Nom"
                        name="name"
                        autoFocus
                        />

                        <TextField
                        color="dark"
                        margin="normal"
                        fullWidth
                        required
                        name="description"
                        label="Description"
                        type="text"
                        id="description"
                        />

                        <TextField
                        color="dark"
                        margin="normal"
                        fullWidth
                        required
                        id="outlined-number"
                        name="price"
                        label="Prix"
                        type="number"
                        InputProps={{ inputProps: { min: 0, max: 5, step: "0.5" } }}
                        />

                        <TextField
                        color="dark"
                        margin="normal"
                        required
                        fullWidth
                        defaultValue="https://picsum.photos/800/300"
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
