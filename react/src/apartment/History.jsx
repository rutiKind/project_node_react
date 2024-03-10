import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import './styleHome.css'
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';

export const History=()=>{
    const [text1, setText1] = useState()
    const [num1,setNum1]=useState()
  
    useEffect(() => {
        axios.get(`https://localhost:7061/api/search/getHistory`)   
            .then(x => {
                debugger
                const data = x.data; 
                 console.log(x.data);
                //  setSearchResults(x.data.map(item => item.map(subItem => subItem))); 
                setText1(data);
                console.log(setText1)
                setNum1(x.data.length)
                console.log(setNum1)

            })

    }, [])
    let nav=useNavigate()

   const xx=(word)=>{
    nav(`/FindSearch/${word}`)

   }
    return<>
    <h3> <mark> היסטוריה </mark> <ContentPasteSearchIcon></ContentPasteSearchIcon></h3>
        <div className='x1'>

           {text1 && <ul>
            {text1.map((item,index) =>
            <p key={index}>
                <button className='li1' onClick={()=>xx(item.search)}>{item.search}</button>
                </p>)}
            </ul>}
            </div>
    
    </>
}