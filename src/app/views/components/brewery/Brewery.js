import React, { useEffect, useState } from 'react'
import { Grid, Box, Card, CardActionArea, CardMedia, CardHeader, CardContent, Typography, Button  } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate, useParams  } from 'react-router-dom';
import Appbar from '../appbar/Appbar';
import { getBreweryById } from '../../../service/brewery.service';

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

export default function Brewery() {
    const navigate = useNavigate();
    const [brewery, setBrewery] = useState(null)
    const params = useParams()

    const productList = [
        {
            "id":"1",
            "name":"86",
            "description":"Pas chère",
            "img":"https://picsum.photos/800/300",
            "price":5
        },
        {
            "id":"2",
            "name":"86",
            "description":"Pas chère",
            "img":"https://picsum.photos/800/300",
            "price":5
        },
        {
            "id":"3",
            "name":"86",
            "description":"Pas chère",
            "img":"https://picsum.photos/800/300",
            "price":5
        },
        {
            "id":"4",
            "name":"86",
            "description":"Pas chère",
            "img":"https://picsum.photos/800/300",
            "price":5
        }
    ]
      
    useEffect(() => {
      const getData = async () => {
        const data = await getBreweryById(params.id)
        setBrewery(data)
      }
      getData()
    }, [])
    
    
  return (
    <>
        <Appbar />
        <Box
        component="img"
        sx={{
          height: 200,
          width: '100%',
          maxHeight: { xs: 200, md: 200 },
        }}
        alt="The house from the offer."
        src={brewery?.img}
      />
        <Grid container sx={{padding:'3%', paddingTop:0}}>
            
            <Grid item xs={12}>
                <h1>{brewery?.name} - Nantes</h1>
            </Grid>

            <Grid item xs={4} sm={4} md={3}>
                <h3>Catégories</h3>
            </Grid>

            <Grid item xs={8} sm={8} md={9}>
                <Grid item xs={12}>
                    <h3>Nos produits</h3>
                </Grid>
                
                <Grid item xs={12} container spacing={2}>
                    {productList.map(beer => (
                    <Grid item xs={4} sm={4} md={4} key={beer.id}>
                        <Card elevation={0} sx={{ borderRadius: 0 }}>

                            <CardActionArea>

                                <CardMedia image={beer.img} style={{ height: 0, paddingTop: '56.25%' }} />
                                <CardHeader title={beer.name}   titleTypographyProps={{ fontSize: '14px', fontWeight:550 }} sx={{paddingLeft:'1%', paddingTop: '3%', paddingBottom:0}}/>

                                <CardContent  sx={{paddingLeft:'1%', paddingTop:'1%', paddingRight:0, paddingBottom:0}}>
                                    <Typography align="left" variant='caption'>
                                    {beer.price} €
                                    </Typography>
                                </CardContent>

                            </CardActionArea>
                            
                        </Card>
                    </Grid>
                    ))}
                </Grid>
            </Grid>
        </Grid>




        <div>
        <Button color="primary"  variant="contained" onClick={()=>navigate("/gestion-brasserie/" + brewery.id)}
        sx={{
            textTransform: 'none',
          position: 'fixed',
          right: '3%',
          bottom: '5%',
      
          background: "linear-gradient(0deg, rgba(245, 245, 245, 0.12), rgba(245, 245, 245, 0.12)), #000000",
          ":hover": { backgroundColor: '#333333' },
          color: '#FFFFFA',
          elevation: 5,

        }}>
           Ajouter un produit
        </Button>
      </div>


    </>
  )
}
