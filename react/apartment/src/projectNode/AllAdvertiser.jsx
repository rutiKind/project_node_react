import { useNavigate } from 'react-router-dom'
import './styleHome.css'
import { Button, TextField } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Label } from '@mui/icons-material'
export const AllAdvertiser = () => {

    const [list, setList] = useState()
    useEffect(() => {
        debugger
        axios.get(`http://localhost:3001/advertiser/getAll`)

            .then(x => {
                debugger
                console.log(x.data)
                setList(x.data)
            })
            .catch(err => {
                console.log(err);

            })
    }, [])

    let nav = useNavigate()
    const getTora = () => {
        debugger
        nav(`/AllTora`)
    }

    return <>
         {list && list.map((item, index) =>
            <div>
                {/* {item.length > 0 && <div className='x1'> */}
                    <p> המילה נמצאה {item.email} פעמים</p>
                {/* </div>
                } */}
            </div>
        )}
        <p>{list&&list.length}</p>
        <p>hhhhhhhhhhhhhhh</p>
    </>

    {/* <Alert severity="error">This is an error alert — check it out!</Alert>
<Alert severity="warning">This is a warning alert — check it out!</Alert>
<Alert severity="info">This is an info alert — check it out!</Alert>
<Alert severity="success">This is a success alert — check it out!</Alert> */}
}