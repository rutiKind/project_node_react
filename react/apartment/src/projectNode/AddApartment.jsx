import React, { useState, useEffect } from 'react';
import { TextField, Button, Select, MenuItem, InputLabel, FormControl, Typography, Box, Grid } from '@mui/material';
import { getAllCategory, getAllCity, addApartment,addCategor,addCit } from './api';
import swal from 'sweetalert';
import Swal from 'sweetalert2';


export const AddApartment=()=>{
    const [categories, setCategories] = useState([]);
  const [cities, setCities] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
    categoryId: '',
    cityId: '',
    address: '',
    numBeds: '',
    additions: '',
    price: '',
    advertiserId: ''
  });

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await AddApartment(formData);
      console.log('Apartment added successfully:', response);
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
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '500px', margin: 'auto',marginTop:'100px' }}>
      <TextField
        label="Name"
        variant="outlined"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />
      <FormControl fullWidth>
        <InputLabel>Category</InputLabel>
        <Select
          value={formData.categoryId}
          label="Category"
          onChange={handleChange}
          name="categoryName"
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
        label="Address"
        variant="outlined"
        name="address"
        value={formData.address}
        onChange={handleChange}
      />
      <TextField
        label="Number of Beds"
        type="number"
        variant="outlined"
        name="numBeds"
        value={formData.numBeds}
        onChange={handleChange}
      />
      <TextField
        label="Additions"
        variant="outlined"
        name="additions"
        value={formData.additions}
        onChange={handleChange}
      />
      <TextField
        label="Price"
        type="number"
        variant="outlined"
        name="price"
        value={formData.price}
        onChange={handleChange}
      />
      <TextField
        label="Advertiser ID"
        variant="outlined"
        name="advertiserId"
        value={formData.advertiserId}
        onChange={handleChange}
      />
      <TextField
        label="Image URL"
        variant="outlined"
        name="image"
        value={formData.image}
        onChange={handleChange}
      />
      <TextField
        label="Description"
        variant="outlined"
        name="description"
        multiline
        rows={4}
        value={formData.description}
        onChange={handleChange}
      />
      
      <Button type="submit" variant="contained">Submit</Button>
    </form>     
    </>
  )
    
}