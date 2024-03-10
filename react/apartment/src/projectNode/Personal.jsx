
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux/es/hooks/useSelector"
import { setCurrentUser } from "./redux/userAction"
import * as React from 'react';
import TextField from '@mui/material/TextField';
import axios from "axios";
import { useState } from "react";
// import './styleTry9.css'

export const Personal = () => {
    debugger
    const [currentAdvertiser, setCurrentAdvertiser] = useState()
    const list = useSelector(x => x.userReducer.users)
    const manager = useSelector(x => x.userReducer.manager)

    const dispatch = useDispatch()
    const nav = useNavigate()

    //פונקציית השליחה ל-store
    const send = (event) => {
        debugger
        event.preventDefault()
        const user = {
            email: event.target[0].value,
            password: event.target[2].value
        }
        axios.get(`http://localhost:3001/advertiser/login/${user.email}/${user.password}`)
        .then(x => {
            debugger
            console.log(x.data)
            setCurrentAdvertiser(x.data)
           
        })
        .catch(err => {
            console.log(err);

        })
        if (currentAdvertiser) {
            dispatch(setCurrentUser())
            nav(`/Home/`)
        }

    }
    return <>
            <p>hhh</p>
    </>
}