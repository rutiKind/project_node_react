import { useNavigate, useParams } from 'react-router-dom'
import './styleHome.css'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { TableContainer } from '@mui/material'
import ManageSearchIcon from '@mui/icons-material/ManageSearch'

//import { GetAll } from './redux/api'

export const FindSomeSearch = () => {
    const [searchResults, setSearchResults] = useState();
    // const [text1, setText1] = useState([])
    const [text2, setText2] = useState()
    const [num1, setNum1] = useState()
    const [num2, setNum2] = useState()
    const [textS, setTextS] = useState()
    let p = useParams()
    useEffect(() => {
        axios.get(`https://localhost:7061/api/search/getLoctionFewWords/${p.word}`)   
            .then(x => {
                debugger
                const data = x.data; 
                 console.log(x.data);
                //  setSearchResults(x.data.map(item => item.map(subItem => subItem))); 
                 setSearchResults(data);
                console.log(setSearchResults)
                setNum1(x.data.length)
                console.log(setNum1)

            })

    }, [])
    let nav=useNavigate();
    const xx=(word)=>{
        debugger
        console.log(word.details)
        nav(`/Details/${word.details}`)

    }

    return <>
          <h3>תוצאות החיפוש למילה {p.word}  <ManageSearchIcon></ManageSearchIcon></h3>

<div className='x1'>
   <p><b><mark>מספר ההופעות של המילה</mark></b></p>
   <p>{num1}</p>
</div>
<div className='x1'>
   <p><b><mark> :מיקומים </mark></b></p>
 {searchResults && <ul>
       {searchResults.map((item,index) =>
       <p key={index}>
           <p key={item.place}>{item.name}<button className='li' onClick={()=>xx(item)}>{item.place} </button></p>
           </p>
       )}
   </ul>}
   
</div>
            
      {/* {searchResults && searchResults.map((result, index) => (
        <ul key={index}>
          {searchResults.map((item, subIndex) => (
            <li key={subIndex}>{item}</li>
          ))}
        </ul>
      ))} */}

           {/* {searchResults && <ul>
            {searchResults.map((item,index) =>
            <p key={index}>
                <li key={item.place}>{item.name} <button className='li' onClick={()=>xx(item)}>item.place</button></li>
                </p>)}
            </ul>} */}
  
      
       
    </>
}




