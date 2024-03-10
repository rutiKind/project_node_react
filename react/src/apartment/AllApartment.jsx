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
// import OneApartment from './OneApartment';

export const AllApartment = () => {

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
        axios.get(`http://localhost:3004/apartment/getAll`)
            .then(x => {
                debugger
                console.log(x.data)
                setList(x.data)
                setListReaplace(x.data)
                axios.get(`http://localhost:3004/category/getAll`)
                    .then(y => {
                        console.log(y.data);
                        // console.log(y.data[0].apartments);
                        setListCategory(y.data)
                        setListCategoryR(y.data)
                        axios.get(`http://localhost:3004/city/getAll`)
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
    // =================================
    // הגדרות של רשימות


    //==================================
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

    const list2 = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                <h3>filter category:</h3>
                <ListItem key={'none'} disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <StartOutlined />
                        </ListItemIcon>
                        <ListItemText primary={'none'} />
                    </ListItemButton>
                </ListItem>
                {listCategory && listCategory.map((item, index) => (
                    <ListItem key={item._id} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <StartOutlined /> : <StarBorderTwoTone></StarBorderTwoTone>}
                            </ListItemIcon>
                            <ListItemText primary={item.name} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                <h3>filter city:</h3>
                <ListItem key={'none'} disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <StartOutlined />
                        </ListItemIcon>
                        <ListItemText primary={'none'} />
                    </ListItemButton>
                </ListItem>
                {listCity && listCity.map((item, index) => (
                    <ListItem key={item._id} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <StartOutlined /> : <StarBorderTwoTone></StarBorderTwoTone>}
                            </ListItemIcon>
                            <ListItemText primary={item.name} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    const priceChange = (value) => {
        const x = Number(value.target.value)
        axios.get(`http://localhost:3001/apartment/getByPriceLittle/${x}`)
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
        axios.get(`http://localhost:3001/apartment/getByNumerBedBig/${x}`)
            .then(x => {
                setList(x.data)
            })
            .catch(err => {
                console.log(err);
            })
    }



    return <>
        <p>all apatments</p>
        {
            list && list.map((item, index) =>
                <div>
                    <p>{item.apartmentName}</p>
                    <p>{item.categoryId.categoryName}</p>
                </div>)
        }

        {
            // list&&list.map((item,index)=><OneApartment _id={item._id} codeAdvertiser={item.codeAdvertiser}></OneApartment>
            // )
        }

        <div className='filter'>
            <React.Fragment key={'right'}>
                <Button onClick={toggleDrawer('right', true)} variant="contained">סינון</Button>
                <Drawer
                    anchor={'right'}
                    open={state['right']}
                    onClose={toggleDrawer('right', false)}
                >
                    {list2('right')}

                </Drawer>
            </React.Fragment>
        </div>

        <Box sx={{ width: 300 }}>
            <h3>סינון לפי מחיר</h3>
            <Slider
                defaultValue={1000}
                aria-label="Default"
                valueLabelDisplay="auto"
                max={1000}
                min={0}
                // value={price}
                // getAriaValueText={priceChange}
                // onChange={priceChange()}
                onChange={priceChange}
            />
        </Box>
        <Box sx={{ width: 300 }}>
            <h3>סינון לפי מיטות</h3>
            <input type='number' onChange={(e)=>{bedChange(e)}}></input>
        </Box>
    </>
}