import Appbar from '../appbar/Appbar';
import React, { useState } from 'react';
import { Grid, Card, CardContent, CardHeader, CardMedia, Typography, CardActionArea, Badge, IconButton  } from '@mui/material';
import cardImage from '../../../image/img.jpg';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Navigator from '../navigation/Navigator';
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

let cardData = [
  { title: 'Burger King',stars: '3' ,description: 'Frais de livraison : 2.49 € • 10-25 min', liked:false },
  { title: 'Macdo',stars: '4.7', description: 'Frais de livraison : 2.49 € • 10-25 min', liked:false },
  { title: 'Quick',stars: '5', description: 'Frais de livraison : 2.49 € • 10-25 min', liked:false },
  { title: 'O\'tacos',stars: '2.5', description: 'Frais de livraison : 2.49 € • 10-25 min', liked:false },
  { title: 'KFC',stars: '4.5', description: 'Frais de livraison : 2.49 € • 10-25 min', liked:false }
];


const Home = () => {

  const [cards, setCards] = useState(cardData);

  const toggleLike = (card) => {
    const updatedCards = cards.map((c) => {
      if (c.title === card.title) {
        
        return { ...c, liked: !c.liked };
      }
      return c;
    });
    cardData = updatedCards;
    setCards(updatedCards);
  };
  
    return (
        <div>
          
          <Appbar />
        <div name="card_list" style={{paddingLeft: '25%', paddingTop:'3%', paddingRight:'3%'}}>
        <Typography align="left" variant='h4' sx={{fontWeight:600, paddingBottom:'2%'}}>
          Brasserie <img alt="" role="presentation" src="https://d4p17acsd5wyj.cloudfront.net/eatsfeed/other_icons/Vector.png" width="14" height="14"></img>
        </Typography>
          <Grid container spacing={3}>
            {cardData.map(card => (
              <Grid item xs={12} sm={6} md={4} key={card.title}>
                <Card elevation={0} sx={{ borderRadius: 0 }}>
                <CardActionArea disableRipple>
                  <CardMedia image={cardImage} title="Card Image" style={{ height: 0, paddingTop: '56.25%' }} />
                  <CardHeader title={card.title}   titleTypographyProps={{ fontSize: '14px', fontWeight:550 }} sx={{paddingLeft:'1%', paddingTop: '3%', paddingBottom:0}}/>
                  <IconButton onClick={() => toggleLike(card)} sx={{position:'absolute', top:'4%', right:'4%', color:'white'}}>
                  {card.liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                  </IconButton>
                  
                  
                  <ThemeProvider theme={theme}>
                    <p style={{position:'absolute', right:'6%', top:'78%'}}><Badge badgeContent={card.stars} color="grey"/></p>
                  </ThemeProvider>
                  <CardContent  sx={{paddingLeft:'1%', paddingTop:'1%', paddingRight:0, paddingBottom:0}}>
                    <Typography align="left" variant='caption'>
                      <img src="https://dkl8of78aprwd.cloudfront.net/uber_one@3x.png" width="11" height="11"/> • {card.description}
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