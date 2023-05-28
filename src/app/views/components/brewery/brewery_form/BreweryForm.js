import React, {useState, useEffect} from 'react'
import { Box, AppBar, Toolbar, Typography, Container, TextField, Button, Grid, IconButton, FormLabel, FormControlLabel, Checkbox  } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate, useParams } from 'react-router-dom';
import BreweryApiService from '../../../../service/brewery.service';
import CloseIcon from '@mui/icons-material/Close';
import Loading from '../../loading/Loading';
import { useAuth0 } from '@auth0/auth0-react';

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
export default function BreweryForm(props) {
    const { user } = useAuth0();
    const navigate = useNavigate();
    const params = useParams();
    const [edit, setEdit] = useState(props.edit);
    const [brewery, setBrewery] = useState(null);
    const [breweryCategory, setBreweryCategory] = useState([]);
    const [isSubmit, setIsSubmit] = useState(false);
    const [checkedList, setCheckedList] = useState([]);

    useEffect(() => {
      const getBrewery = async () => {
        if(edit === true) {
          const data = await BreweryApiService().getBreweryById(params.id)
          setBrewery(data)
          if(brewery?.user){
            if(localStorage.getItem('user_email') != brewery.user.email) {
              navigate('/')
            }
          }
        } else {
          setBrewery([])
        }
        
      }
      getBrewery()
      const getBreweryCategory = async () => {
        const data = await BreweryApiService().getBreweryCategory()
        setBreweryCategory(data)
      }
      getBreweryCategory()
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmit(true);
        const data = new FormData(event.currentTarget);

        if(edit) {
          const jsonBrewery = {
            "id": brewery.id,
            "name": data.get('name'),
            "description": data.get('description'),
            "img": data.get('img'),
            "stars": data.get('stars'),
            "categories": []
          }
          await BreweryApiService().saveBrewery(checkedList, jsonBrewery).then(response => {
            navigate('/gestion-brasserie/' + brewery.id);
            })
            .catch(error => {
              console.log(error);
              
            });
        } else {
          const jsonBrewery = {
            "name": data.get('name'),
            "description": data.get('description'),
            "img": data.get('img'),
            "stars": data.get('stars'),
            "categories": []
          }
          await BreweryApiService().addBrewery(checkedList, jsonBrewery).then(response => {
          navigate('/');
          })
          .catch(error => {});
        }
      };

      if (brewery == null) {
        return <Loading/>;
      }

      const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        if (checked) {
          setCheckedList([...checkedList, name]);
        } else {
          setCheckedList(checkedList.filter((checkbox) => checkbox !== name));
        }
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
            <IconButton onClick={()=> { edit ? navigate("/gestion-brasserie/" + brewery?.id) : navigate("/")}  }><CloseIcon/></IconButton>
            
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
                        {edit ?"Modifier une brasserie" : "Ajouter une brasserie"}
                    </Typography>

                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                        color="dark"
                        margin="normal"
                        required
                        fullWidth
                        defaultValue={brewery?.name}
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
                        defaultValue={brewery?.description}
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
                        defaultValue={brewery?.stars}
                        name="stars"
                        label="Note"
                        type="number"
                        InputProps={{ inputProps: { min: 0, max: 5, step: "0.5" } }}
                        />

                        <TextField
                        color="dark"
                        margin="normal"
                        required
                        fullWidth
                        defaultValue={edit ? brewery?.img : "https://picsum.photos/800/300"}
                        name="img"
                        label="Lien vers l'image"
                        type="text"
                        id="img"
                        />
                      <FormLabel sx={{ paddingTop:'2%'}} component="legend">Catégories</FormLabel>
                      <Grid container spacing={1} sx={{ paddingLeft:'20%', paddingTop:'3%'}}>
                        {breweryCategory.map((category) => (
                          <Grid item xs={6} sm={6} md={6} key={category.id}>
                            <FormControlLabel
                              label={category.name}
                              control={<Checkbox name={category.name} onChange={handleCheckboxChange} />}
                            />
                          </Grid>
                        ))}
                      </Grid>


                        <Button
                        type="submit"
                        disabled={isSubmit}
                        fullWidth
                        color="dark"
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        >
                        {edit ? "Modifier" : "Ajouter"}
                        </Button>
                        
                    </Box>
                    </Box>
                
                </Container>




        </ThemeProvider>
    </div>
  )
}
