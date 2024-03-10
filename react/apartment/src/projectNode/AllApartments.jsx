//import store from "./redux/Store"
import { Provider, useSelector } from 'react-redux'
import { Routing } from "./Routing"
import { Nav } from "./Nav"
import { BrowserRouter } from "react-router-dom";
import store from "./redux/Store";
import './styleHome.css'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { StarBorderTwoTone, StartOutlined } from '@mui/icons-material';
import Slider from '@mui/material/Slider';
import OneApartment from './OneApartment';
import { getAllCategory, getAllCity,allApartment, getByPricreLittle,getByBigBed } from './api';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {  CardActionArea, CardActions } from '@mui/material';
import TextField from '@mui/material/TextField';

export const AllApartments = () => {
     

    // שליפת כל הדירות
    const [list, setList] = useState()
    const [listReplace, setListReaplace] = useState()
    const [listCategory, setListCategory] = useState()
    const [listCity, setListCity] = useState()
    const [listCategoryR, setListCategoryR] = useState()
    const [listCityR, setListCityR] = useState()
    const [price, setPrice] = useState()
    useEffect(() => {
        debugger
        allApartment()
            .then(x => {
                debugger
                console.log(x.data)
                setList(x.data)
                setListReaplace(x.data)
                //שליפת כל הקטגוריות
                getAllCategory()
                    .then(y => {
                        console.log(y.data);
                        setListCategory(y.data)
                        setListCategoryR(y.data)
                        //שליפת כל הערים
                        getAllCity()
                            .then(z => {
                                console.log(z.data);
                                setListCity(z.data)
                                setListCityR(z.data)
                            })
                    })
            })
            .catch(err => {
                console.log(err);

            })
    }, [])


    const [state, setState] = React.useState({
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        debugger
        const a = event.target.innerText
        if (a != 'סינון' && a != 'none') {
            let cc = listCategoryR.filter(x => x.name == a)
            if (cc) {
                setList(cc[0].apartments)
            }
            else {
                let ll = listCityR.filter(x => x.name == a)
                setList(ll[0].apartments)
            }

        }
        else if (a == 'none') {
            setList(listReplace)
        }

        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    // const list2 = (anchor) => (
    //     <Box
    //         sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
    //         role="presentation"
    //         onClick={toggleDrawer(anchor, false)}
    //         onKeyDown={toggleDrawer(anchor, false)}
    //     >
    //         <List>
    //             <h3>filter category:</h3>
    //             <ListItem key={'none'} disablePadding>
    //                 <ListItemButton>
    //                     <ListItemIcon>
    //                         <StartOutlined />
    //                     </ListItemIcon>
    //                     <ListItemText primary={'none'} />
    //                 </ListItemButton>
    //             </ListItem>
    //             {listCategory && listCategory.map((item, index) => (
    //                 <ListItem key={item._id} disablePadding>
    //                     <ListItemButton>
    //                         <ListItemIcon>
    //                             {index % 2 === 0 ? <StartOutlined /> : <StarBorderTwoTone></StarBorderTwoTone>}
    //                         </ListItemIcon>
    //                         <ListItemText primary={item.name} />
    //                     </ListItemButton>
    //                 </ListItem>
    //             ))}
    //         </List>
    //         <Divider />
    //         <List>
    //             <h3>filter city:</h3>
    //             <ListItem key={'none'} disablePadding>
    //                 <ListItemButton>
    //                     <ListItemIcon>
    //                         <StartOutlined />
    //                     </ListItemIcon>
    //                     <ListItemText primary={'none'} />
    //                 </ListItemButton>
    //             </ListItem>

    //             {listCity && listCity.map((item, index) => (
    //                 <ListItem key={item._id} disablePadding>
    //                     <ListItemButton>
    //                         <ListItemIcon>
    //                             {index % 2 === 0 ? <StartOutlined /> : <StarBorderTwoTone></StarBorderTwoTone>}
    //                         </ListItemIcon>
    //                         <ListItemText primary={item.name} />
    //                     </ListItemButton>
    //                 </ListItem>
    //             ))}
    //         </List>
    //     </Box>
    // );

    const priceChange = (value) => {
        const x = Number(value.target.value)
        console.log("🚀 ~ priceChange ~ x:", x)
        

        getByPricreLittle(x)
            .then(x => {
                setList(x.data)
            })
            .catch(err => {
                console.log(err);
            })
    }

    const bedChange = (value) => {
        debugger
        const x = Number(value.target.value)
        getByBigBed(x)
                .then(x => {
                setList(x.data)
            })
            .catch(err => {
                console.log(err);
            })
    }



    return <>
    <div style={{backgroundColor:'#e5e7eb'}}>
   <Box sx={{ display: 'flex', justifyContent: 'center', gap: '20px', padding: '20px', flexWrap: 'wrap',fontSize:'small'}}>
            <Box sx={{ width: 200, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'start', gap: '10px' ,marginTop:10}}>
                <Typography variant="h7">
                    Filter by price smaller than
                </Typography>
                <Slider
                    defaultValue={1000}
                    aria-label="Default"
                    valueLabelDisplay="auto"
                    max={5000}
                    min={0}
                    onChange={priceChange}
                />
            </Box>
            <Box sx={{ width: 200, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'start', gap: '10px', marginTop:13}}>
                <Typography variant="h7">
                    Filter by number of beds
                </Typography>
                <TextField  
                    id="outlined-basic" 
                    type='number' 
                    onChange={(e) => { bedChange(e) }}  
                    label="Num of Beds" 
                    variant="outlined" 
                    //fullWidth
                />
            </Box>
        </Box>
        <p>all apatments</p>
        {   
            list && list.map((item, index) =>
                <div>
                    <p>{item.apartmentName}</p>
                    {/* <img src={`http://localhost:3004/${item.pic}`} alt="Your Image" style={{ width: '100%', height: '200px' }}></img> */}
                    <img src={`http://localhost:3004/${item.pic}`} alt="Your Image" style={{ width: '100%', height: '200px' }}></img>

                    {/* <p>{item.categoryId.categoryName}</p> */}
                </div>)
        }

        {
            list&&list.map((item,index)=><OneApartment _id={item._id} codeAdvertiser={item.advertiserId}></OneApartment>
            )
        }

        <div className='filter'>
            <React.Fragment key={'right'}>
                <Button onClick={toggleDrawer('right', true)} variant="contained">סינון</Button>
                <Drawer
                    anchor={'right'}
                    open={state['right']}
                    onClose={toggleDrawer('right', false)}
                >
                    {/* {list2('right')} */}

                </Drawer>
            </React.Fragment>
        </div>
        </div>
      
      
    </>
}