import React, {useState, useEffect} from 'react'
import { Box, AppBar, Toolbar, Typography, Container, TextField, Button, IconButton  } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate, useParams } from 'react-router-dom';
import ProductApiService from '../../../../service/product.service';
import CloseIcon from '@mui/icons-material/Close';
import Loading from '../../loading/Loading';

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
export default function ProductForm(props) {
  
    const navigate = useNavigate();
    const params = useParams();
    const [edit, setEdit] = useState(props.edit);
    const [breweryId, setBreweryId] = useState(null);
    const [product, setProduct] = useState(null);
    const [isSubmit, setIsSubmit] = useState(false);


    
    useEffect(() => {
      const getData = async () => {
        if(edit === true) {
          const data = await ProductApiService().getProductById(params.id)
          setProduct(data.data)
          setBreweryId(data.data.brewery)
        } else {
          setProduct([])
          setBreweryId(params.id)
        }
        
      }
      getData()
    }, [])

  
    const handleSubmit = async (event) => {
        setIsSubmit(true)
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        
        if(edit) {
          const jsonProduct = {
            "id": product.id,
            "name": data.get('name'),
            "description": data.get('description'),
            "img": data.get('img'),
            "price": data.get('price')
          }
          await ProductApiService().saveProduct(jsonProduct, breweryId).then(response => {
            navigate('/gestion-brasserie/' + breweryId);
            })
            .catch(error => {
              console.log(error);
              
            });
        } else {
          const jsonProduct = {
            "name": data.get('name'),
            "description": data.get('description'),
            "img": data.get('img'),
            "price": data.get('price')
          }
          await ProductApiService().addProduct(jsonProduct, breweryId).then(response => {
          navigate('/gestion-brasserie/' + breweryId);
          })
          .catch(error => {
            console.log(error);
            
          });
        }
        
      };
      
      if (product == null) {
        return <Loading/>;
      }
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
            <IconButton onClick={()=> navigate("/gestion-brasserie/" + breweryId)  }><CloseIcon/></IconButton>
            
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
                        { edit ? "Modifier un produit de votre brasserie" : "Ajouter un produit à votre brasserie"}
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
                        defaultValue={product?.name}
                        autoFocus
                        />

                        <TextField
                        color="dark"
                        margin="normal"
                        fullWidth
                        required
                        name="description"
                        label="Description"
                        defaultValue={product?.description}
                        type="text"
                        id="description"
                        />

                        <TextField
                        color="dark"
                        margin="normal"
                        fullWidth
                        required
                        id="outlined-number"
                        defaultValue={product?.price}
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
                        defaultValue={edit ? product?.img : "https://picsum.photos/800/300"}
                        name="img"
                        label="Lien vers l'image de la brasserie"
                        type="text"
                        id="img"
                        />

                        <Button
                        disabled={isSubmit}
                        type="submit"
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
