import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { Divider } from '@mui/material';
import axios from 'axios';


export const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event) => {   
    event.preventDefault();
    debugger
    const email=event.target.value[0]
    const password=event.target.value[1]
      axios.post(`/http://localhost:3004/advertiser/register/`,JSON.stringify({ email, password }))   
          .then(x => {
              debugger
              const data = x.data; 
               console.log(x.data);
  
            }) 
    // try {
    //   const response = await fetch('http://localhost:3004/advertiser/register', {  
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ email, password }),
    //   });
    //   const data = await response.json(); 
    //   console.log(data);
    //   alert("success")
    // } catch (error) {
    //   console.error('Error:', error);
    //   // טיפול בשגיאה
    // }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f0f0' }}>
      <Card style={{ minWidth: 450, maxWidth: '90%', width: 'auto', margin: '0 20px 20px 20px', padding: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', marginTop: '-5vh' }}>
        <CardContent>
          <div style={{ textAlign: 'left', marginBottom: '20px' }}>
            <h2 style={{ margin: 0 }}>הרשמה</h2>
            <Divider style={{ margin: '8px 0' }} />
          </div>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
            <TextField
              label="אימייל"
              type="email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="סיסמא"
              variant="outlined"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={togglePasswordVisibility}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
              שלח
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Register;