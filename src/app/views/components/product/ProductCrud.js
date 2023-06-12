import React, { useEffect, useState }  from 'react'
import { Box, AppBar, Toolbar, Typography, IconButton, Grid, Card, CardActionArea, CardMedia, CardHeader, CardContent, Button  } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate, useParams } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import ProductApiService from '../../../service/product.service';
import BreweryApiService from '../../../service/brewery.service';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
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
export default function ProductCrud() {
  const {user, isAuthenticated, isLoading} = useAuth0();
    const navigate = useNavigate();
    const [brewery, setBrewery] = useState(null)
    const [products, setProducts] = useState([])
    const params = useParams()
    const columns = [
   
      {
        field: 'name',
        headerName: 'Nom',
        width: 350,
        editable: false,
      },
      {
        field: 'description',
        headerName: 'Description',
        width: 600,
        editable: false,
      },
      {
        field: 'img',
        headerName: 'Lien de l\'image',
        width: 500,
        editable: false,
      },
      {
        field: 'price',
        headerName: 'Prix',
        type: 'number',
        width: 110,
        editable: false,
      },
      {
        field: 'actions',
        type: 'actions',
        headerName: 'Actions',
        width: 100,
        cellClassName: 'actions',
        getActions: ({ id }) => {
          return [
            <GridActionsCellItem
              icon={<EditIcon />}
              label="Edit"
              className="textPrimary"
              onClick={handleEditProductClick(id)}
              color="inherit"
            />,
            <GridActionsCellItem
              icon={<DeleteIcon />}
              label="Delete"
              onClick={handleDeleteProductClick(id)}
              color="inherit"
            />,
          ];
        },
      },
  
      
    ];

    useEffect(() => {
        const getData = async () => {
          const data = await BreweryApiService().getBreweryById(params.id)
          setBrewery(data)
          setProducts(data.products)
        }
        getData()
    }, [])

    if(!isLoading) {
      if(brewery?.user?.email != user?.email) {
        navigate('/')
      }
    } 

    const handleDeleteProductClick = (id) => () => {
      setProducts(products.filter(product => product.id !== id))
      const getData = async () => {
        await ProductApiService().deleteProduct(id).then(response => {
          setProducts(products.filter(product => product.id !== id))
        })
        .catch(error => {
          navigate('/gestion-brasserie/' + params.id);
        });

      }
      getData()
    };

    const handleEditProductClick = (id) => () => {
      navigate("/modifier-un-produit/"+id)
    };


    const handleDeleteBreweryClick = (id) => () => {
      const getData = async () => {
        await BreweryApiService().deleteBrewery(id).then(response => {
          navigate('/');
        })
        .catch(error => {console.log(error)});
          
      }
      getData()
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
            <div style={{padding:'2%', paddingTop:'1%'}}>
            <Grid xs={12}>
                <h1>Gestion de la brasserie {brewery?.name}</h1>
            </Grid>
            <Grid item xs={12} container spacing={2} sx={{padding:'5%'}}>
            <div>
              <Button color="primary"  variant="contained" onClick={()=>navigate("/ajouter-un-produit/" + brewery?.id)}
              sx={{
                  textTransform: 'none',
                  background: "linear-gradient(0deg, rgba(245, 245, 245, 0.12), rgba(245, 245, 245, 0.12)), #000000",
                  ":hover": { backgroundColor: '#333333' },
                  color: '#FFFFFA',
                  elevation: 5,
              }}>
                Ajouter un produit
              </Button>
            </div>
              <Box sx={{ width: '100%' }}>
                <DataGrid autoHeight rows={products} columns={columns} />
              </Box>
            
            </Grid>
            </div>

        </ThemeProvider>
        <Grid   sx={{position: 'fixed', right: '5%', bottom: '5%'}}>
          <Button color="primary"  variant="contained" onClick={handleDeleteBreweryClick(brewery?.id)}
          sx={{
              textTransform: 'none',
            background: "linear-gradient(0deg, rgba(245, 245, 245, 0.12), rgba(245, 245, 245, 0.12)), #ba000d",
            ":hover": { backgroundColor: '#f44336' },
            color: '#FFFFFA',
            elevation: 5,

          }}>
            Supprimer la brasserie
          </Button>
          <Button color="primary"  variant="contained" onClick={()=>navigate("/modifier-une-brasserie/" + brewery?.id)}
          sx={{
              textTransform: 'none',
        
            background: "linear-gradient(0deg, rgba(245, 245, 245, 0.12), rgba(245, 245, 245, 0.12)), #000000",
            ":hover": { backgroundColor: '#333333' },
            color: '#FFFFFA',
            elevation: 5,
            marginLeft: '16px',

          }}>
            Modifier la brasserie
          </Button>
        </Grid>
    </div>
  )

  
}
