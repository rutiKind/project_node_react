import { useNavigate, useParams } from 'react-router-dom'
import './styleHome.css'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { TableContainer } from '@mui/material'
import ManageSearchIcon from '@mui/icons-material/ManageSearch'

//import { GetAll } from './redux/api'
export const FindSearch = () => {

    const [text1, setText1] = useState()
    const [text2, setText2] = useState()
    const [num1, setNum1] = useState()
    const [num2, setNum2] = useState()
    const [textS, setTextS] = useState()
    let p = useParams()
    useEffect(() => {
        axios.get(`https://localhost:7061/api/search/getLoction/${p.word}`)
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
            // axios.get(`https://localhost:7061/api/search/getLoctionParsha/${p.word}/${p.spe}`)
            // // GetAll(p.word)
            // .then(x => {
            //     debugger
            //     // console.log(x.data);
            //     setTextS(x.data)
            //     //setNum1(x.data.length)

            // })
            // .catch(err => {
            //     console.log(err);
            //     setTextS("jjjjjjjjjj")
            // })
    }, [])
    let nav=useNavigate()
    const xx=(item)=>{
        debugger
        console.log(item)
        nav(`/Details/${item.details}`)
    }
    // useEffect(() => {
    //     axios.get(`https://localhost:7233/api/Tora/GetLocationWord/${p.word}`)
    //         // GetAll(p.word)
    //         .then(x => {
    //             console.log(x.data);
    //             setText2(x.data)
    //         })
    //         .catch(err => {
    //             console.log(err);
    //             setText2("mmmmmmmm")
    //         })
    // }, [])
    // useEffect(() => {
    //     axios.get(`https://localhost:7233/api/Tora/GetCountWord/${p.word}`)
    //         // GetAll(p.word)
    //         .then(x => {
    //             console.log(x.data);
    //             setNum1(x.data)
    //         })
    //         .catch(err => {
    //             console.log(err);
    //             setNum1("3")
    //         })
    // }, [])
    // useEffect(() => {
    //     axios.get(`https://localhost:7233/api/Tora/GetCountWord/${p.word}`)
    //         //axios.get(`https://localhost:7233/api/Tora/GetLocationSpech/${p.word}/${p.word}`)
    //         // GetAll(p.word)
    //         .then(x => {

    //             console.log(x.data);
    //             setNum2(x.data)
    //         })
    //         .catch(err => {
    //             console.log(err);
    //             setNum2("1")
    //         })
    // }, [])
    return <>
            <h3>תוצאות החיפוש למילה {p.word}  <ManageSearchIcon></ManageSearchIcon></h3>

         <div className='x1'>
            <p><b><mark>{p.word}מספר ההופעות של המילה</mark></b></p>
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
        {/* =========================== */}
        {/* <div class="table">
    <table class="table">
      <thead>
        <tr>
          <th>מקור</th>
          <th>פסוק</th>
          <td></td>
        </tr>
      </thead>
      <tbody class="body">
      {text1.map(i=>
        <tr  >
            
        <td>{i.place}</td>
        <td>{i.text}</td>
        </tr>  )} 
        </tbody>
     </table>     
  </div> */}
        {/* =========================== */}

        {/* <div className='x1'>
            <p><b>המיקומים של המילה גם בתוך מילים</b></p>
            <p>{text2}</p>
        </div>
        <div className='x1'>
            <p><b>מספר ההופעות של המילה גם בתוך מילים</b></p>
            <p>{num2}</p>
        </div> */}
    </>
}