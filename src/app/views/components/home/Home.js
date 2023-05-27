import Appbar from '../appbar/Appbar';
import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, CardHeader, CardMedia, Typography, CardActionArea, Badge, IconButton, Pagination, Skeleton, Box  } from '@mui/material';
import cardImage from '../../../image/img.jpg';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Navigator from '../navigation/Navigator';
import { useNavigate } from 'react-router-dom';
import BreweryApiService from '../../../service/brewery.service';
import UserApiService from '../../../service/user.service';
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

const Home = () => {
  const {user} = useAuth0();
  const urlParams = new URLSearchParams(window.location.search);
  const redirectParam = urlParams.get('redirect');
  const redirectParamAuth = urlParams.get('auth');

  if (redirectParam === 'true') {
    window.location.replace(window.location.pathname + "?auth=true");
  }
  if (redirectParamAuth === 'true') {
    UserApiService().addUser(user.email)
    window.location.replace(window.location.pathname);
  }

  const [brewery, setBrewery] = useState([])
  const [search, setSearch] = useState('')
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1)
  const [nbItem, setNbItem] = useState(9)
  const [totalPages, setTotalPages] = useState(0)
  const [isLoading, setisLoading] = useState(true)

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

  const changePage = (e, page) => {
    setisLoading(true)
    setCurrentPage(page)
    const getData = async () => {
      const data = await BreweryApiService().getBrewery(page, nbItem)
      setBrewery(data.content)
      setisLoading(false)
    }
    getData()
  }

  useEffect(() => {
    const getData = async () => {
      const data = await BreweryApiService().getBrewery(currentPage, nbItem)
      setBrewery(data.content)
      setTotalPages(data.totalPages)
      setisLoading(false)
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
          { isLoading ?
            (
              <Grid container spacing={2}>
                {Array.from(Array(9).keys()).map((index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Skeleton variant="rectangular" sx={{
                        height: { xs: 150, sm: 200, md: 300 },
                      }} animation="wave" />
                    <Skeleton animation="wave" width="40%"  height={20} style={{ marginTop: 5 }} />
                    <Skeleton animation="wave" width="60%"  height={20} />
                  </Grid>
                ))}
              </Grid> 
            )
            :
            (
              <Grid container spacing={3}>
                {brewery?.filter(brewery => brewery.name.toLowerCase().includes(search.toLowerCase())).map(card => (
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
            )
          }

          <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center" sx={{ minHeight: '5vh' }}>
            <Pagination count={totalPages} defaultPage={1} onChange={changePage} showFirstButton showLastButton disabled={isLoading} size="large"/>
          </Grid>
          </div>
      </div>
        )
}

export default Home