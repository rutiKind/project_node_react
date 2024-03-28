import React, { useState, useEffect } from 'react';
import { TextField, Button,InputAdornment , Select, MenuItem, InputLabel, FormControl, Typography, Box, Grid } from '@mui/material';
import { getAllCategory, getAllCity, addApartment,addCategor,addCit } from './api';
import swal from 'sweetalert';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';
import Lottie from 'react-lottie';
import cuteHouseImage from './img/cuteHouseImage.jpg';
import HomeIcon from '@mui/icons-material/Home';
import home2 from './img/2.jpg'
import AccountCircle from '@mui/icons-material/AccountCircle';
import LocationCity from '@mui/icons-material/LocationCity';
import AttachMoney from '@mui/icons-material/AttachMoney';
import DescriptionIcon from '@mui/icons-material/Description';
import Hotel from '@mui/icons-material/Hotel';    
import PlaylistAddCheck from '@mui/icons-material/PlaylistAddCheck';   
import VpnKey from '@mui/icons-material/VpnKey';
import { useNavigate } from 'react-router-dom';


export const AddApartment=()=>{
  const [categories, setCategories] = useState([]);
  const [cities, setCities] = useState([]);
  const advertiser= useSelector(state =>state.userReducer.currentUser)
  console.log(advertiser);
  const [formData, setFormData] = useState({
    apartmentName: '',
    description: '',
    image: '',
    categoryId: '',
    cityId: '',
    address: '',
    numBeds: '',
    addition: '',
    price: '',
    advertiserId: advertiser._id
  });
  let nav=useNavigate()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const categories = await getAllCategory();
        const cities = await getAllCity();
        setCategories(categories.data);
        setCities(cities.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFormData(prevState => ({ ...prevState, image: file }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formDataObj = new FormData();
    for (const key in formData) {
      formDataObj.append(key, formData[key]);
    }
    
    try {
      const response = await addApartment(formDataObj); 
      Swal.fire({
        title: "Apartment added succefully!",
        text: "You are transferred to the page of all the apartments",
        icon: "success"      
    });
      console.log('Apartment added successfully:', response);
      nav('/AllApartment/')
    } catch (error) {
      console.error('Failed to add apartment:', error);
    }
  };
  const addCity=()=>{
    Swal.fire({
        title: "enter city to add",
        input: "text",
        inputAttributes: {
          autocapitalize: "off"
        },
        style:{
        },

        showCancelButton: true,
        confirmButtonText: "add",
        showLoaderOnConfirm: true,
        preConfirm: async (cityName) => {
          try {
            debugger
            //הוספת עיר
            console.log(cityName);
            addCit(cityName)
            Swal.fire({
                title: "The city add succefully!",
                icon: "success"      
            });
            const cities = await getAllCity();
            setCities(cities.data);
          } catch (error) {
            Swal.showValidationMessage(`
              Request failed: ${error}
            `);
          }
        },
   
      });
  }


  const addCategory=()=>{
    Swal.fire({
        title: "enter category to add",
        input: "text",
        inputAttributes: {
          autocapitalize: "off"
        },
        style:{
        },

        showCancelButton: true,
        confirmButtonText: "add",
        showLoaderOnConfirm: true,
        preConfirm: async (categoryName) => {
          try {
            debugger
            //הוספת קטגוריה 
            addCategor(categoryName)
            Swal.fire({
                title: "The category add succefully!",
                icon: "success"      
            });
            const categories = await getAllCategory();
            setCategories(categories.data);
        } catch (error) {
            Swal.showValidationMessage(`
              Request failed: ${error}
            `);
          }
        },
   
      });
  }
  

  return(<>
           <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f0f0f0', paddingTop: '60px' }}>
    <div style={{ width: '100%', maxWidth: '600px', backgroundColor: 'white', padding: '40px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', borderRadius: '8px', margin: '20px', boxSizing: 'border-box' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '40px' }}>Add Apartment</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <TextField
        label="apartmentName"
        variant="outlined"
        name="apartmentName"
        value={formData.apartmentName}
        onChange={handleChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
      />
     
      <TextField
        label="Address"
        variant="outlined"
        name="address"
        value={formData.address}
        onChange={handleChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LocationCity />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        label="Number of Beds"
        type="number"
        variant="outlined"
        name="numBeds"
        value={formData.numBeds}
        onChange={handleChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Hotel />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        label="Addition"
        variant="outlined"
        name="addition"
        value={formData.addition}
        onChange={handleChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PlaylistAddCheck />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        label="Price"
        type="number"
        variant="outlined"
        name="price"
        value={formData.price}
        onChange={handleChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AttachMoney />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        label="Advertiser ID"
        variant="outlined"
        name="advertiserId"
        value={formData.advertiserId}
        //onChange={handleChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <VpnKey />
            </InputAdornment>
          ),
        }}
      />
     <TextField
  type="file"
  label="Image URL"
  variant="outlined"
  name="image"
  onChange={handleFileChange}
/>
       
       <FormControl fullWidth>
        <InputLabel>Category</InputLabel>
        <Select
          value={formData.categoryName}
          label="Category"
          onChange={handleChange}
          name="categoryId"
        >
          {categories.map(category => (
            <MenuItem key={category._id} value={category._id}>{category.categoryName}</MenuItem>
          ))}
        <MenuItem onClick={addCategory}>Add category</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel>City</InputLabel>
        <Select
          value={formData.cityName}
          label="City"
          onChange={handleChange}
          name="cityId"
        >
          {cities.map(city => (
            <MenuItem key={city._id} value={city._id}>{city.cityName}</MenuItem>
          ))}
        <MenuItem onClick={addCity}>Add city</MenuItem>
        </Select>
      </FormControl>

      <TextField
        label="Description"
        variant="outlined"
        name="description"
        multiline
        rows={4}
        value={formData.description}
        onChange={handleChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <DescriptionIcon />
            </InputAdornment>
          ),
        }}
      />
      
      <Button type="submit" variant="contained">Submit</Button>
    </form>  
    </div>  
    </div> 
    </>
  )
    
}