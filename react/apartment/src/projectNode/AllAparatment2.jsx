import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CardActions} from '@mui/material';
import { Box, Button, Drawer, Typography, Slider, TextField, FormGroup, FormControlLabel, Checkbox, Card, CardMedia, CardContent, Grid } from '@mui/material';
import { getAllCategory, getAllCity, allApartment ,getByPricreLittle,getByBigBed,byCategoryId,byCityId,booking,getTemp} from './api';
import './homeStyle.css'
import Swal from 'sweetalert2'
import { useSelector } from 'react-redux';
import userReducer from './redux/userReducer';

export const AllApartment = () => {
  const [apartments, setApartments] = useState([]);
  const [filterApartments, setFilterApartments] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);
  const [price, setPrice] = useState(5000);
  const [beds, setBeds] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCitie, setSelectedCitie] = useState('');
  const [temp, setTemp] = useState();
  


//כל הפרטים
  useEffect(() => {
    const fetchData = async () => {
      const resApartments = await allApartment();
      console.log(resApartments.data);
      const resCategories = await getAllCategory();
      console.log(resCategories.data);
      const resCities = await getAllCity();
      console.log(resCities.data);

      setApartments(resApartments.data);
      setFilterApartments(resApartments.data);
      setCategories(resCategories.data);
      setCities(resCities.data);
    };
    fetchData();
  }, []);

  //סינון לפי מחיר
  const handlePriceChange = (event, newValue) => {
    debugger
    setPrice(newValue);
    console.log(newValue);
    getByPricreLittle(newValue)
    .then(x => {
        setApartments(x.data)
    })
    .catch(err => {
        console.log(err);
    })
  };

  //סינון לפי כמות מיטות
  const handleBedChange = (event) => {
    setBeds(event.target.value);
    console.log(beds);
    getByBigBed(event.target.value).
    then(x=>
        {
            setApartments(x.data)
        })
        .catch(err=>{
            console.log(err);
        })
    
  };

  //סינון לפי קטגוריה
  const handleCategoryChange = (event) => {
    debugger
    const { name, checked } = event.target;
    setSelectedCategories(prev => 
      checked ? [...prev, name] : prev.filter(category => category !== name)
    );
   setSelectedCategory(event.target.name);

    byCategoryId(name)
    .then(x=>{
        setApartments(x.data)
    })
    .catch(err=>{
        console.log(err);
    })

  };

  //סינון לפי עיר
  const handleCityChange = (event) => {
    debugger
    const { name, checked } = event.target;
    setSelectedCities(prev => 
      checked ? [...prev, name] : prev.filter(city => city !== name)
    );
    setSelectedCitie(event.target.name)
    byCityId(name).
    then(x=>{
        setApartments(x.data)
    })
    .catch(err=>{
        console.log(err);
    })
  };
  const USER = useSelector(state =>state.userReducer.currentClient);
   
  //בדיקה האם הלקוח מחובר כדי שיוכל להזמין
  const IsUserLoggedIn = () => {
  //  console.log(localStorage.getItem('currentUser'));
    return USER.password !== '';
  };

  const filteredApartments = apartments.filter(apartment => 
    apartment.price <= price && 
    apartment.beds >= beds && 
    (selectedCategories.length === 0 || selectedCategories.includes(apartment.categoryId)) &&
    (selectedCities.length === 0 || selectedCities.includes(apartment.cityId))
  );


  const send=(id)=>{
    debugger
    booking(id,USER)
      Swal.fire({
        title: "The order has been registered!",
        text: "The details of the apartment were sent to the email",
        icon: "success"
      });
  }

//  const getTem =(id)=>{
//   debugger
//   console.log(id);
//  getTemp(id)
//   .then(result => {
//     setTemp(result)
//     console.log(temp);
//     return  12
//     // פרטי הדירה שמוחזרים מה־Promise
//   })
//   .catch(x=>{
//     return "fghjkl";
//   }
    // )
  //setTemp=tt.data
    //console.log(temp);
  // }
  return (
    <Box sx={{ flexGrow: 1 ,backgroundColor:'#f9f9f9'}}>
          <div className='div'></div>
          
          <Typography variant="h3" component="h1" sx={{ textAlign: 'left',fontFamily: "Arial",
  fontWeight: "bold",
  fontSize: "34px", color: '#1976d2', m: 5 ,marginTop:'70px'}}>
All apartments
  </Typography>
      <Drawer
        variant="permanent"
        sx={{
          width: 260,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {height:800, width: 240, boxSizing: 'border-box', marginTop:9 ,marginLeft:160 },
        }}>
        <Box sx={{ overflow: 'auto' ,marginTop:8 }}>
          <Typography variant="h6" sx={{ marginTop: 0 }}>
            Filters
          </Typography>
          <Typography sx={{ margin: 2 }}>Price up to: {price}</Typography>
          <Slider style={{width: 200}}
            value={price}
            onChange={handlePriceChange}
            aria-labelledby="price-slider"
            valueLabelDisplay="auto"
            min={0}
            max={5000}
          />
          <TextField
            label="Minimum Beds"
            type="number"
            value={beds}
            onChange={handleBedChange}
            size="small"
            margin="normal"
            sx={{ margin: 2 }}
          />
          <FormGroup>
     <p style={{color:'#1976d2'}}><b> filter by category</b></p>
      {categories.map((category) => (
        <FormControlLabel
          control={<Checkbox
                     checked={selectedCategory === category._id}
                     onChange={handleCategoryChange}
                     name={category._id} />}
          label={category.categoryName}
          key={category._id}
        />
      ))}
    </FormGroup>
          <FormGroup>
            <p  style={{color:'#1976d2'}}><b>filter by city</b></p>
            {cities.map((city) => (
              <FormControlLabel
              checked={selectedCitie === city._id}
                control={<Checkbox onChange={handleCityChange} name={city._id} />}
                label={city.cityName}
                key={city._id}
              />
            ))}
          </FormGroup>
        </Box>
      </Drawer>
      <Grid container spacing={3} sx={{ padding: '20px', width:'85%' }}>
  {apartments.map((apartment) => (
    <Grid item xs={12} sm={6} md={3.7} key={apartment._id} style={{marginLeft:12}}>
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', }}>
        <CardMedia
          component="img"
          height="140"
          image={`http://localhost:3004/${apartment.pic}`}
          alt="Apartment"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {apartment.apartmentName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Price: {apartment.price} | Beds: {apartment.numBed}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ my: 1.5 }}>
            {apartment.description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Category: {apartment.categoryId.categoryName} | City: {apartment.cityId.cityName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Address: {apartment.address} | Addition: {apartment.addition}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          {IsUserLoggedIn() && (
            <Button size="small" color="primary" onClick={() => send(apartment._id)}>
              להזמנה
            </Button>
          )}
          {/* <p>
  Temperature: {getTem(apartment._id)}°C
  </p>
   <Typography variant="body2" color="text.secondary">
    Description: {apartment.weatherData ? apartment.weatherData.weather[0].description : 'N/A'}
</Typography> */}
{/* <p>{getTem('65ca4863c8ff6d6b0e199a87')}fghjkjhgf</p> */}
        </CardActions>
      </Card>
    </Grid>
  ))}
</Grid>
 

   </Box>
 );
};
