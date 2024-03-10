import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux/es/hooks/useSelector"
import { setCurrentUser,setCurrentClient } from "./redux/userAction"
import * as React from 'react';
import TextField from '@mui/material/TextField';
import axios from "axios";
import { useState } from "react";
import { IconButton, InputAdornment } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import Button from '@mui/material/Button';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CardContent from '@mui/material/CardContent';
import EmailIcon from '@mui/icons-material/Email';
import { Divider } from '@mui/material';
import Card from '@mui/material/Card';
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Swal from 'sweetalert2'
import { forgetPassword,loginClient } from "./api";

// import './styleTry9.css'

export const Login = () => {
    debugger
    const [currentAdvertiser, setCurrentAdvertiser] = useState()
    const [currentClient, setCurrentClient1] = useState()
    const list = useSelector(x => x.userReducer.users)
    const manager = useSelector(x => x.userReducer.manager)
    const client=useSelector(x=>x.userReducer.currentClient)

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [userType, setUserType] = useState('');


    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const dispatch = useDispatch()
    const nav = useNavigate()

    //פונקציית השליחה ל-store
    const send = (event) => {
        debugger
        event.preventDefault()
        const user = {
            email: event.target[0].value,
            password: event.target[2].value,
        }
        //התחברות מפרסם
        if (userType === 'advertiser') {
            axios.post(`http://localhost:3004/advertiser/login/`,user)
            .then(x => {
                //במקרה של חוסר הצלחה
                if(x.status!="200")
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "advertiser does not exist",
                    footer: '<a href="/register"> to register</a></a>'
                  });
                debugger
                //שמירת המפרסם
                setCurrentAdvertiser(x.data.advertiser[0])
                localStorage.setItem('token',x.data.token)
                localStorage.setItem('currentUser',JSON.stringify(x.data.advertiser[0]))
                console.log(x.data)
                    dispatch(setCurrentUser(x.data.advertiser[0]))
                    dispatch(setCurrentClient())
                    //הצלחה
                    Swal.fire({
                        icon: "success",
                        title: "You've logged in successfully",
                        text: `Hi ${x.data.advertiser[0].email} welcome back`,
                        confirmButtonColor: '#3085d6',
                      });
                    nav(`/Home/`)
            })
            .catch(err => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "advertiser does not exist",
                    footer: '<a href="/register"> to register</a></a>'
                  });
                console.log(err);

            })
            //התחברות לקוח
          } else if (userType === 'client') {
            debugger
            loginClient(user).
            then(x=>{
                if(x.status!="200")
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Client does not exist",
                    footer: '<a href="/register"> to register</a></a>'
                  });
                 //שמירת לקוח
                setCurrentClient1(x.data.customer2)
                console.log(x.data.customer2.email);
                localStorage.setItem('token',x.data.token)
                console.log(x.data.customer2);
                localStorage.setItem('currentClient',JSON.stringify(x.data.customer2))
                console.log(x.data.customer2);
                dispatch(setCurrentClient(x.data.customer2))
                dispatch(setCurrentAdvertiser(''))
                console.log(currentClient);
                //הצלחה
                Swal.fire({
                    icon: "success",
                    title: "You've logged in successfully",
                    text: `Hi ${x.data.customer2.email} welcome back`,
                    confirmButtonColor: '#3085d6',
                  });
                nav('/Home/')
            }
)
.catch(x=>{
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Client does not exist",
        footer: '<a href="/register"> to register</a></a>'
      });
    })
          }
    
    }
    //איפוס סיסמא
    const handleForgotPassword = () => {
        Swal.fire({
            title: "Enter email address to reset password",
            input: "text",
            inputAttributes: {
              autocapitalize: "off"
            },
            style:{
            },

            showCancelButton: true,
            confirmButtonText: "send",
            showLoaderOnConfirm: true,
            preConfirm: async (login) => {
              try {
                debugger
                //שכחתי סיסמא
                forgetPassword(login)
                Swal.fire({
                    title: "The email was sent successfully!",
                   // text: "Your file has been deleted.",
                    icon: "success"      
                });
              } catch (error) {
                Swal.showValidationMessage(`
                  Request failed: ${error}
                `);
              }
            },
       
          });
    };
    return <>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f0f0' }}>
            <Card style={{ minWidth: 450, maxWidth: '90%', width: 'auto', margin: '0 20px 20px 20px', padding: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', marginTop: '-5vh' }}>
                <CardContent>
                    <div style={{ textAlign: 'left', marginBottom: '20px' }}>
                        <h2 style={{ margin: 0 }}>Login</h2>
                        <Divider style={{ margin: '8px 0' }} />
                    </div>
                    <form onSubmit={send} style={{ display: 'flex', flexDirection: 'column' }}>
                        <TextField required 
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
                        <TextField required 
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
                         <div>
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
      </div>
                         <Link component="button" variant="body2" onClick={handleForgotPassword} style={{ alignSelf: 'flex-start', marginTop: '8px' }}>
                            שכחתי סיסמא
                        </Link>
                        <Button type="submit" variant="contained" style={{ marginTop: '20px', backgroundColor: '#1976d2'}}>
                            שלח
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
        <Box sx={{ width: 300 }}>
            <Slider
                size="small"
                defaultValue={70}
                aria-label="Small"
                valueLabelDisplay="auto"
            />
            <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" />
        </Box>
    </>
}