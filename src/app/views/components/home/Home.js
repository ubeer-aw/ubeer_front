import Appbar from '../appbar/Appbar';
import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, CardHeader, CardMedia, Typography, CardActionArea, Badge, IconButton  } from '@mui/material';
import cardImage from '../../../image/img.jpg';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Navigator from '../navigation/Navigator';
import { useNavigate } from 'react-router-dom';
import { getBrewery } from '../../../service/brewery.service';

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

const Home = () => {
  const [brewery, setBrewery] = useState([])
  const [search, setSearch] = useState('')
  const navigate = useNavigate();

  const toggleLike = (card) => {
    /*
    const updatedCards = cards.map((c) => {
      if (c.title === card.title) {
        
        return { ...c, liked: !c.liked };
      }
      return c;
    });
    cardData = updatedCards;
    setCards(updatedCards);*/
  };

  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  useEffect(() => {
    const getData = async () => {
      const data = await getBrewery()
      setBrewery(data)
    }
    getData()
  }, [])
    return (
        <div>
          
          <Appbar name={search} onNameChange={setSearch}/>
        <div name="card_list" style={{paddingLeft: '25%', paddingTop:'3%', paddingRight:'3%'}}>
        <Typography align="left" variant='h4' sx={{fontWeight:600, paddingBottom:'2%'}}>
          Brasseries <img alt="" role="presentation" src="https://d4p17acsd5wyj.cloudfront.net/eatsfeed/other_icons/Vector.png" width="14" height="14"></img>
        </Typography>
          <Grid container spacing={3}>
            {brewery.filter(brewery => brewery.name.includes(search)).map(card => (
              <Grid item xs={12} sm={6} md={4} key={card.id}>
                <Card elevation={0} sx={{ borderRadius: 0 }}>
                <CardActionArea onClick={()=>navigate("/brasserie/" + card.id)}>
                  <CardMedia image={card.img} title="Card Image" style={{ height: 0, paddingTop: '56.25%' }} />
                  <CardHeader title={card.name}   titleTypographyProps={{ fontSize: '14px', fontWeight:550 }} sx={{paddingLeft:'1%', paddingTop: '3%', paddingBottom:0}}/>
                  <IconButton onClick={() => toggleLike(card)} sx={{position:'absolute', top:'4%', right:'4%', color:'white'}}>
                  {0 ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                  </IconButton>
                  
                  
                  <ThemeProvider theme={theme}>
                    <p style={{position:'absolute', right:'6%', top:'78%'}}><Badge badgeContent="4" color="grey"/></p>
                  </ThemeProvider>
                  <CardContent  sx={{paddingLeft:'1%', paddingTop:'1%', paddingRight:0, paddingBottom:0}}>
                    <Typography align="left" variant='caption'>
                      <img src="https://dkl8of78aprwd.cloudfront.net/uber_one@3x.png" width="11" height="11"/> • Frais de livraison : 2.49 € • 10-25 min
                    </Typography>
                  </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
        )
}

export default Home