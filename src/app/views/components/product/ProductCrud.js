import React, { useEffect, useState }  from 'react'
import { Box, AppBar, Toolbar, Typography, IconButton, Grid, Card, CardActionArea, CardMedia, CardHeader, CardContent  } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate, useParams } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
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
export default function ProductCrud() {
    const navigate = useNavigate();
    const [brewery, setBrewery] = useState(null)
    const params = useParams()

    useEffect(() => {
        const getData = async () => {
          const data = await getBreweryById(params.id)
          setBrewery(data)
        }
        getData()
    }, [])

    const columns = [
      { field: 'id', headerName: 'ID', width: 90 },
      {
        field: 'firstName',
        headerName: 'First name',
        width: 150,
        editable: true,
      },
      {
        field: 'lastName',
        headerName: 'Last name',
        width: 150,
        editable: true,
      },
      {
        field: 'age',
        headerName: 'Age',
        type: 'number',
        width: 110,
        editable: true,
      },
      {
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (params) =>
          `${params.row.firstName || ''} ${params.row.lastName || ''}`,
      },
    ];

    const rows = [
      { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
      { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
      { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
      { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
      { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
      { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
      { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
      { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
      { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    ];

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
            <Grid xs={1}></Grid>
            <Grid item xs={10} container spacing={2}>
                    
            </Grid>
            <Grid xs={1}></Grid>

            </div>

        </ThemeProvider>
    </div>
  )
}
