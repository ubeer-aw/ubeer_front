import React, { useEffect, useState } from 'react'
import { Grid, Box, Card, CardActionArea, CardMedia, CardHeader, CardContent, Typography, Button  } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate, useParams  } from 'react-router-dom';
import Appbar from '../appbar/Appbar';
import BreweryApiService from '../../../service/brewery.service';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
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

export default function Product() {
  const {user} = useAuth0();
    const navigate = useNavigate();
    const [brewery, setBrewery] = useState(null)
    const [product, setProduct] = useState(null)
    const [search, setSearch] = useState('');
    const params = useParams()
    
      
    useEffect(() => {
      const getData = async () => {
        const data = await BreweryApiService().getBreweryById(params.brewery)
        setBrewery(data)
        if(brewery?.user){
          if(localStorage.getItem('user_email') != brewery.user.email) {
            navigate('/')
          }
        }
      }
      getData()
    }, [])
    
    
  return (
    <>
        <Appbar name={search} onNameChange={setSearch} />
        <Grid container spacing={2} sx={{paddingTop:'5%'}}>
            <Grid xs={3}  sx={{backgroundColor:'green'}}>
                xs=8
            </Grid>
            <Grid xs={6} sx={{backgroundColor:'red'}}>
                <Grid xs={12} sx={{backgroundColor:'red'}}>
                <ArrowBackIcon/> Retourner à la 
                </Grid>
            </Grid>
            <Grid xs={3}  sx={{backgroundColor:'green'}}>
                xs=4
            </Grid>
        </Grid>


    </>
  )
}
