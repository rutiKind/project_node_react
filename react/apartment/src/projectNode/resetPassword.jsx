import React, { useState } from 'react';
import { TextField, Button, Card, CardContent, IconButton, InputAdornment, Typography } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useParams } from 'react-router-dom';
import { chengePassword,chengePassword2 } from './api';


export const ResertPassword=()=>{

  const [userType, setUserType] = useState('');

    debugger
    let p=useParams()
    const email=p.email
    console.log(email);
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
  
    const handleClickShowPassword = () => {
      setShowPassword(!showPassword);
    };
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
  
    const handlePasswordChange = (event) => {
      setPassword(event.target.value);
    };
  
    const handleSubmit = (event) => {
        debugger
      event.preventDefault();
      console.log(password);
      if(userType==='advertiser'){
        chengePassword(email,password).then(x=>{
      alert("success")
      })
      .catch(x=>
        alert("error")
        )
      }
      else
       chengePassword2(email,password). then(x=>
        alert("success")
      )  
      .catch(x=>
        alert("error")
        )
    };

    return<>
<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card style={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h5" component="div" style={{ marginBottom: 20 }}>
            איפוס סיסמה
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="סיסמה חדשה"
              type={showPassword ? 'text' : 'password'}
              variant="outlined"
              value={password}
              onChange={handlePasswordChange}
              fullWidth
              margin="normal"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <label>
          <input 
            type="radio"
            value="advertiser"
            checked={userType === 'advertiser'}
            onChange={(e) => setUserType(e.target.value)}
          />
          Advertiser
        </label>
        <label>
          <input
            type="radio"
            value="client"
            checked={userType === 'client'}
            onChange={(e) => setUserType(e.target.value)}
          />
          Client
        </label>
            <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '20px' }}>
              שנה סיסמה
            </Button>

          </form>
        </CardContent>
      </Card>
    </div>


    </>
}