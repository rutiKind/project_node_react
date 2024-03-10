import { NavLink, useNavigate } from 'react-router-dom'
// import './styleHome.css'
import './homeStyle.css'
import { Button, TextField } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Label } from '@mui/icons-material'
import PhoneIcon from '@mui/icons-material/Phone';
import MailIcon from '@mui/icons-material/Mail';
import FacebookIcon from '@mui/icons-material/Facebook';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
//import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import React, { useRef } from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
// import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
//import React from 'react'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
//import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';



export const Home = () => {

  const [list, setList] = useState()

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const moveLogin = () => {
    nav(`/Login`)
  }
  const moveRegister = () => {
    nav(`/Register`)
  }
  let nav = useNavigate()


//maps
const containerStyle = {
  width: '100%',
  height: '400px'
};

  
  const center = {
      lat: 31.87857629883687,
      lng: 35.18744381502342
    };
    


  //ניתוב
  const contactRef = useRef(null);

//צוק קשר
useEffect(() => {
  const hash = window.location.hash;
  if (hash) {
    const element = document.querySelector(hash);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}, []);
//מפה

//

// const containerStyle = {
//   width: '400px',
//   height: '400px'
// };

// const center = {
//   lat: -3.745,
//   lng: -38.523
// };


  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // מאפשר גלילה חלקה
    });
  }

  return <>
 <IconButton onClick={scrollToTop} style={{ position: 'fixed', bottom: '20px', right: '20px', backgroundColor: 'white', color: 'black' }} aria-label="Scroll to top">
  <KeyboardArrowUpIcon />
</IconButton>

    <div style={{ width: '100%', background: 'url(../../images/home12.png) no-repeat center center ', backgroundSize: 'cover', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h1 style={{ color: 'white', fontSize: '3rem' }}>דירות ארוח, התחלת<span className="underline"></span> המסע שלך כאן</h1>
      <NavLink to='/AllApartment' style={{ color: 'white', fontSize: '1.5rem', marginTop: '1rem' }}className={'link'} >עיצוב, נוחות, ואיכות - בלחיצת כפתור </NavLink>
      {/* <AccountCircleIcon fontSize='large' style={{width:'10%',height:'10%',color:'white',flex:''}}></AccountCircleIcon> */}

      <React.Fragment>
        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
          {/* <Typography sx={{ minWidth: 100 }}>Contact</Typography>
        <Typography sx={{ minWidth: 100 }}>Profile</Typography> */}
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleClick}
              size="large"
              sx={{ ml: -90 }}
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              <Avatar sx={{ fontSize: 'large', width: 65, height: 65, color: 'white', backgroundColor: 'black',marginBottom:'-9rem' }}>{<AccountCircleIcon fontSize='large' style={{ width: 65, height: 65 }}></AccountCircleIcon>}</Avatar>
            </IconButton>
          </Tooltip>
        </Box>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem onClick={moveLogin}>
            <Avatar /> Log in to my account
          </MenuItem>
          <Divider />
          <MenuItem onClick={moveRegister}>
            <ListItemIcon>
              <PersonAdd fontSize="small" />
            </ListItemIcon>
            to create an account
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Settings
          </MenuItem>
        </Menu>
      </React.Fragment>
    </div>
    <div className='div'></div>
    <div style={{ backgroundColor: '#f9f9f9' }}>
      <div style={{ marginRight: '5%', float: 'right', marginTop: '3%', backgroundColor: '#f9f9f9' }}>
        <h1 style={{ borderBottomColor: 'greenyellow' }}>אודות  <span className="underline"></span>האתר</h1>
        <br></br>
        <div style={{
  textAlign: 'right',
  lineHeight: '1.3',
  fontSize: '18px',
  fontFamily: '"Arial", sans-serif',
  maxWidth: '600px',
  margin: 'auto',
  borderRadius: '10px',
}}>
  <p>Welcome to the 'Hosting Apartments' website.  Your meeting place with the most selected accommodation apartments in Israel, offering an unforgettable stay experience.</p>
  <p>With apartments equipped at the highest level and located in central and desirable locations, you can enjoy a wide variety of apartments. 'Dirat Aroch' is committed to quality and complete satisfaction.</p>
  <p>In order to ensure that your stay will be pleasant, pampering, and without worries, we turn every moment into a perfect experience with guest apartments - your home away from home.</p>
</div>  </div>
      <div style={{ marginTop: '0%', backgroundColor: '#f9f9f9' }}>
        <img src='../../images/honeSmall.jpg' width={'40%'}></img>
      </div>
    </div>
    <div className='div'></div>

    <div style={{ marginLeft: '8%', marginRight: '5%', width: '80%', height: '550px', marginBottom: '3%' }}>
      <h1 style={{ borderBottomColor: 'greenyellow', marginBottom: '3%' }}>מה <span className="underline"></span>מסביב </h1>
      <br></br>
      <Card sx={{ width: '23%', float: 'right', marginRight: '8%', marginLeft: '5%', borderBottomColor: 'rgb(146, 244, 198)' }}>
        <CardContent>
          <Typography  color="text.secondary" >
            <div className="circle">
              <img src="../../images/honeSmall.jpg" alt="Your Image" style={{ width: '200px%', height: '200px' }}></img>
            </div>
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            <h3>נקודות עניין</h3>
          </Typography>
          <Typography variant="body2">
            <p>
              'נקודות עניין' מהווה מלווה מושלם לכל
              חובב טיולים שרוצה להפוך כל יום יציאה
              להרפתקה אישית. שירותינו מאפשר
              למשתמשים למצוא בקלות אתרים קרובים
              למקום הנוכחי או נקודות עניין ביעדים
              מתוכננים, עם ידע עשיר ועדכני שמעמיק
              את החוויה בכל ביקור.
            </p>
          </Typography>
          <span className="underline"></span>
        </CardContent>

      </Card>
      <Card sx={{ width: '23%', float: 'right', marginLeft: '5%', borderBottomColor: 'rgb(146, 244, 198)' }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            <div className="circle">
              <img src="../../images/honeSmall.jpg" alt="Your Image" style={{ width: '100%', height: '200px' }}></img>
            </div>
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            <h2>אטרקציות</h2>
          </Typography>
          <Typography variant="body2">
            <p>'אטרקציות בסביבה' מחברת אותך עם
              ההתרגשות שנמצאת ממש מעבר לפינה!
              מפעילויות מרתקות ועד מקומות מרגיעים
              , הפלטפורמה המקיפה שלנו היא הבחירה
              שלך לתכנון יום בילוי מושלם. לא עוד חיפוש
              אינסופי - אנחנו מביאים את האטרקציות
              היישר אליכם.</p>
          </Typography>
          <span className="underline"></span>
        </CardContent>
      </Card>
      <Card sx={{ width: '23%', float: 'right', marginLeft: '5%', borderBottomColor: 'rgb(146, 244, 198)' }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            <div className="circle">
              <img src="../../images/honeSmall.jpg" alt="Your Image" style={{ width: '100%', height: '200px' }}></img>
            </div>
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            <h3>צימרים</h3>
          </Typography>
          <Typography variant="body2">
            <p>
              צימרים מציע מפלט שליו מההמולה של חיי
              היומיום, ומספק חדרי אירוח נעימים ופרטיים
              השוכנים בכמה מהמקומות הציוריים ביותר.
              כל חלל מעוצב באופן ייחודי מבטיח שילוב
              של נוחות וטבע, מושלם לחופשה מרגשת או
              מפלט שליו
              ורגוע.
            </p>
          </Typography>
          <span className="underline"></span>
        </CardContent>
      </Card>
    </div>
    <div className='div'></div>
    <div className='div'></div>

    <div className='navBottom' style={{ marginBottom: '-3%',backgroundColor:'#f9f9f9'  }} >

      <h1 style={{ borderBottomColor: 'greenyellow' }}>ליצירת<span className="underline" id='contect'></span> קשר</h1>

      <div style={{ width: '40%', float: 'right', marginTop: '3%', marginRight: '5%' }}>
        <p>New York, NY, United states</p>
        <p>
          123456789<PhoneIcon></PhoneIcon><br></br>
          example@example.com<MailIcon></MailIcon>
        </p>
        <p style={{ alignItems: 'center' }}><FacebookIcon></FacebookIcon></p>
      </div>
      <div style={{ width: '40%', marginLeft: '10%', marginTop: '4%' }}>
        <div style={{ marginBottom: '2rem' }}>
          <TextField
            id="filled-multiline-flexible1"
            label="שם"
            multiline
            maxRows={5}
            variant="filled"
            className="input"
            style={{ width: '40%', marginRight: '2%', textAlign: 'right' }}
          />
          <TextField
            id="filled-multiline-flexible1"
            label="פלאפון"
            multiline
            maxRows={5}
            variant="filled"
            className="input"
            style={{ width: '40%' }}
          />
        </div>
        <div style={{ marginBottom: '2rem' }}>
          <TextField
            id="filled-multiline-flexible1"
            label="כתובת אימייל"
            multiline
            maxRows={5}
            variant="filled"
            className="input"
            style={{ width: '82%' }}
          />
        </div>
        <div style={{ marginBottom: '2rem' }}>
          <textarea placeholder="הערה" style={{ width: '81%', height: '60px' }}></textarea>
        </div>
        {/* <button style={{ width: '82%' }}>שליחה</button> */}
        <button type="submit" className="button" style={{ width: '82%', backgroundColor: 'black', borderColor: 'black', borderRadius: '3%' ,color:'white'}}>צור קשר</button>
      </div>
    </div>
    <div className='div'></div>
    <div className='div'></div>

{/* maps */}
<LoadScript
        googleMapsApiKey="AIzaSyDXxMh9IYK_sGxaCSQzcLvkGVqhJD-kA_0" // הכנס את מפתח ה-API שלך כאן
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
        >
          {/* כאן ניתן להוסיף ילדים נוספים ל-GoogleMap אם רוצים, כמו מרקרים, אזורים וכו' */}
        </GoogleMap>
      </LoadScript>


    
    <Box sx={{ p: 4, backgroundColor: '#f5f5f5', textAlign: 'center' }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
      Contact      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, mb: 2 }}>
        <PhoneIcon />
        <Typography variant="body1">0583209640</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, mb: 2 }}>
        <EmailIcon />
        <Typography variant="body1">r583209640@gmail.com</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
        <LocationOnIcon />
        <Typography variant="body1">רחוב הדישון, 6 </Typography>
      </Box>
    </Box>
  </>

  {/* <Alert severity="error">This is an error alert — check it out!</Alert>
<Alert severity="warning">This is a warning alert — check it out!</Alert>
<Alert severity="info">This is an info alert — check it out!</Alert>
<Alert severity="success">This is a success alert — check it out!</Alert> */}
}