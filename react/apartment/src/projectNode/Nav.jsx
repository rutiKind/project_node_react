import './styleHome.css'
import './NavStyle.css'
import { NavLink, useNavigate } from 'react-router-dom'
import DoneIcon from '@mui/icons-material/Done'
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import ScheduleSendIcon from '@mui/icons-material/ScheduleSend';
import FolderIcon from '@mui/icons-material/Folder';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import PhoneIcon from '@mui/icons-material/Phone';
import MailIcon from '@mui/icons-material/Mail';
import HubIcon from '@mui/icons-material/Hub';
import ShareIcon from '@mui/icons-material/Share';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PinDropIcon from '@mui/icons-material/PinDrop';
// import { IoAccessibilityOutline } from "react-icons/io5";
import { useState } from 'react';
import { useSelector } from 'react-redux';

import { TbMessageCircleQuestion } from "react-icons/tb";
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
import React from 'react'
import { FaUserCircle,FaChevronDown ,FaTemperatureHigh } from 'react-icons/fa';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
// import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import  { useRef } from 'react';
import { getTemp } from './api';
//import { FaUserCircle, FaTemperatureHigh } from 'react-icons/fa'; // ייבוא האייקונים מהספרייה המתאימה
//import AccountCircleIcon from '@mui/icons-material/AccountCircle';






export const Nav = () => {
  //ניתוב
  const contactRef = useRef(null);

//צוק קשר
  const Contact = () => {
    contactRef.current.scrollIntoView({ behavior: 'smooth' });
  };

//מפה

//

    const [temp, setTemp] =useState()
    const [value, setValue] = useState('recents');
    const cu = useSelector(x => x.userReducer.currentUser)
    const [c, setC] = useState(cu)

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };



    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const anchorRef = React.useRef(null);
    let nav = useNavigate()

    const myApartment = () => {
        nav('/AllMyApartment')
    }

    const add = () => {
      nav('./AddApartment')
    }

    const prevOpen = React.useRef(open);

    // const getTem =()=>{
    //     debugger
    //     const id='65ca4863c8ff6d6b0e199a87'
    //    getTemp(id)
    //     .then(result => {
    //       setTemp(result)
    //       console.log(temp);
    //       return  12
    //     })
    //     .catch(x=>{
    //       return "fghjkl";
    //     }
    //       )
    //     //setTemp=tt.data
    //       //console.log(temp);
    //     }

    return <>
            {/* <div>
            <Tooltip title={`Temperature: ${getTem()} °C`}>
              <IconButton>
                <FaTemperatureHigh size={30} color="black" />
              </IconButton>
            </Tooltip>
          </div> */}
        <div className={'nav'}>
            {
                cu && cu.email != '' &&
                <div>
                    <React.Fragment>
                        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                            <Tooltip title="Account settings">
                                <IconButton
                                    onClick={handleClick}
                                    size="large"
                                    sx={{ ml: 2 }}
                                    aria-controls={open ? 'account-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                >
              <FaUserCircle size={40} color="black" backgroundColor="black" marginLeft="55%" sx={{ marginLeft:'px',fontSize: '450px', width: 42, height: 42, color: 'white', backgroundColor: 'black' }}>{<AccountCircleIcon fontSize='large' style={{ width: 75, height: 65 }}></AccountCircleIcon>}</FaUserCircle >
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
                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
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
                                        right: 14,
                                        width: 32,
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

                            <MenuItem onClick={add}>
                                <Avatar  /> addApartment
                            </MenuItem>
                            <Divider />
                            <MenuItem onClick={myApartment}>
                                <ListItemIcon>
                                    <PersonAdd fontSize="small" />
                                </ListItemIcon>
                                AllMyApartment
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
            }
           
            {/* <a href='http://localhost:3000/Home#map' className={'link'}>{<PinDropIcon></PinDropIcon>}</a> */}
            {/* <a  href='http://localhost:3000/Home#contect' className={'link'}>{<PhoneIcon></PhoneIcon>}</a> */}
            {/* <a href='http://localhost:3000/Home#contect'>{<MailIcon></MailIcon>}</a> */}
            {/* <a href='http://localhost:3000/Home#contect'>{<ShareIcon></ShareIcon>}</a> */}
            <NavLink to='CommonQuestions' className={'ICON'}>{<TbMessageCircleQuestion/>}</NavLink>
            <NavLink to='Home' className={'link'}>Home</NavLink>
            <NavLink to='AllApartment' className={'link'}>AllApartments</NavLink>
        </div>
    </>
}