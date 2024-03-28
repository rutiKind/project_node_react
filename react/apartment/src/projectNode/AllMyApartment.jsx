import { useEffect, useState } from "react"
import { getApartmentByUser,updateA,deleteApartments } from "./api"
import { Box, Button, Drawer, Typography, Slider, TextField, FormGroup, FormControlLabel, Checkbox, Card, CardMedia, CardContent, Grid,IconButton} from '@mui/material';
import { Apartment } from "@mui/icons-material";
import Swal from 'sweetalert2'
import DeleteIcon from '@mui/icons-material/Delete';
 
export const AllMyApartment=()=>{
    console.log("cvgbhjk,l.");
    debugger
     const currentUser=localStorage.getItem('currentUser')
    const user=JSON.parse(currentUser)
    console.log(user);

     const [all, setAll] = useState([])
     useEffect(() => {
        console.log(user._id);
        debugger
        getApartmentByUser(user._id)
            .then(x => {
                console.log(x.data);
               setAll(x.data)
         })
            .catch(err => {
                console.log(err);

            })
    }, [])
    const deleteApartment=(apartmentId)=>{
      console.log(apartmentId);
      Swal.fire({
        title: "Are you sure?",
        text: "Do delete the apartment",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          debugger
          deleteApartments(apartmentId).then(x=>{
            getApartmentByUser(user._id)
            .then(x => {
             console.log(x.data);
             setAll(x.data)
            Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        })
        })
        }     
      })
    }
  
    const update = (apartment) => {
      debugger
        Swal.fire({
            title: 'ערוך דירה',
            html: `
              <input type="text" id="name" class="swal2-input" placeholder="שם" value="${apartment.apartmentName}">
              <input type="number" id="price" class="swal2-input" placeholder="מחיר" value="${apartment.price}">
              <input type="number" id="beds" class="swal2-input" placeholder="כמות מיטות" value="${apartment.numBed}">
              <input type="text" id="address" class="swal2-input" placeholder="כתובת" value="${apartment.address}">
              <input type="text" id="addition" class="swal2-input" placeholder="addition" value="${apartment.addition}">
              <input type="text" id="description" class="swal2-input" placeholder="description" value="${apartment.description}">
              <input type="file" id="image" class="swal2-input value="${apartment.pic}">
            `,
            focusConfirm: false,
            preConfirm: () => {
                debugger
                const formData = new FormData();
                formData.append('id', apartment._id); 
                formData.append('apartmentName', document.getElementById('name').value);
                formData.append('price', document.getElementById('price').value);
                formData.append('numBed', document.getElementById('beds').value);
                formData.append('address', document.getElementById('address').value);
                formData.append('addition', document.getElementById('addition').value);
                formData.append('description', document.getElementById('description').value);
                console.log(formData);
                for (let [key, value] of formData.entries()) {
                    console.log(key, value);
                }                
                const imageFile = document.getElementById('image').files[0];
                if (imageFile) {
                    formData.append('image', imageFile);
                }
                return formData; 
            }
        }).then((result) => {
            if (result.isConfirmed && result.value) {
               console.log(result.value);
                updateA(result.value).then(x => {
                    console.log("success");
                    getApartmentByUser(user._id)
                    .then(x => {
                      console.log(x.data);
                     setAll(x.data)
               })

                }).catch(err => console.error(err));
                console.log('Updated data:', result.value);
            }
        });
    };
    
    
    return(
    <>
    <Grid container spacing={3} sx={{ padding: '100px' }}>
        {all.map((apartment) => (
          <Grid item xs={12} sm={6} md={4} key={apartment._id}>
            <Card sx={{ maxWidth: 345, m: 2 }}>
              <CardMedia
                component="img"
                height="140"
                image={`http://localhost:3004/${apartment.pic}`}
                alt="Apartment Image"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {apartment.apartmentName}
                </Typography>
                {/* פרטי הדירה */}
              </CardContent>
              <Button onClick={() => update(apartment)}>Update</Button>
              <IconButton aria-label="delete apartment" onClick={() => deleteApartment(apartment._id)}>
                <DeleteIcon />
              </IconButton>
            </Card>
          </Grid>
        ))}
      </Grid>
     </>
    );
}