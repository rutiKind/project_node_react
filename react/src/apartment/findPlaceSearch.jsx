import { useNavigate, useParams } from 'react-router-dom'
import './styleHome.css'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { TableContainer } from '@mui/material'
import ManageSearchIcon from '@mui/icons-material/ManageSearch'

//import { GetAll } from './redux/api'
export const FindPlaceSearch = () => {

    const [text1, setText1] = useState()
    const [text2, setText2] = useState()
    const [num1, setNum1] = useState()
    const [num2, setNum2] = useState()
    const [textS, setTextS] = useState()
    let p = useParams()
    console.log(p.setSelectedValue);
    useEffect(() => {
        axios.get(`https://localhost:7061/api/search/getLoctionParsha/${p.word}/${p.setSelectedValue}`)
            // GetAll(p.word)
            .then(x => {
                debugger
                 console.log(x.data);
                //  setText1("לא אותרו תוצאות")
                // else
                setText1(x.data)
                if(x.data.length==0)
            {
                setNum1("לא אותרו תוצאות")
                // setText1("לא אותרו תוצאות")
                }
            else
                setNum1(x.data.length)      
                console.log(setNum1)

            })  
    }, [])
    let nav=useNavigate()
    const xx=(item)=>{
        debugger
        console.log(item)
        nav(`/Details/${item.details}`)
    }
    return <>
    <h3>תוצאות החיפוש למילה {p.word}  <ManageSearchIcon></ManageSearchIcon></h3>

 <div className='x1'>
    <p><b><mark>מספר ההופעות של המילה</mark></b></p>
    <p>{num1}</p>
</div>
<div className='x1'>


    <p><b><mark> :מיקומים </mark></b></p>
   {/* {text1 && <ul>
    {text1.map((item,index) =>
    <p key={index}>
        <p key={item.place}>{item.name} <button className='li' onClick={()=>xx(item)}>{item.place}</button></p>
        </p>)}
    </ul>} */}
  {text1 && <ul>
        {text1.map((item,index) =>
        <p key={index}>
            <p key={item.place}>{item.name.substring(0,item.name.indexOf(p.word))} {<mark>{item.name.substring(item.name.indexOf(p.word),p.word.length+item.name.indexOf(p.word))}</mark>}{item.name.substring(item.name.indexOf(p.word)+p.word.length)} <button className='li' onClick={()=>xx(item)}>{item.place} </button></p>
            </p>
        )}
    </ul>}
    
</div>
</>

}