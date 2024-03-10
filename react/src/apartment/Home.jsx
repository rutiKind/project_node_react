import { useNavigate } from 'react-router-dom'
import './styleHome.css'
import { Button, TextField } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import navv from './path/navv.PNG'
import ManageSearchIcon from '@mui/icons-material/ManageSearch'

export const Home = () => {
  //   const [list,setList]=useState()
  //   const [x,setX]=useState(true)
  //   const [selectedValue, setSelectedValue] = useState('');
    
  // const handleChange = (event) => {
  //   setSelectedValue(event.target.value);
  // };

        
  //           debugger
  //           useEffect(() => {
  //           axios.get(`https://localhost:7061/api/search/getAllBooks`)
  //               .then(x => {
  //                   debugger
  //                   setList(x.data)
  //                   console.log(x.data)
  //                   setX(true)
  //               })
  //       },[])
    
            
   
    


  //   let nav=useNavigate()
  //   const getTora=()=>{
  //       debugger
  //       nav(`/AllAdvertiser`)
  //       // nav(`/AllTora`)
        
  //   }
  //   const search=(event)=>{
  //       let word=event.target[1].value
  //       nav(`/FindSearch/${word}`)
  //   }

  //   const searchSome=(event)=>{
  //       debugger
  //       let word=event.target[1].value
  //       nav(`/FindSomeSearch/${word}`)
  //   }

  //   const searchOnly=(event)=>{
  //       debugger
  //       let word=event.target[1].value
  //       nav(`/FindOnly/${word}`)
  //   }

  //   const findPlaceSearch=(event)=>{
  //       debugger
  //       console.log(setSelectedValue)
  //       let word=event.target[1].value   
  //       let r=event.target[3].value
  //       nav(`/findPlaceSearch/${word}/${r}`)
  //   }

  //   return<>
  //     <img src={navv} alt="Logo" id="homePage1"></img>
  //       {/* <input type="text" placeholder="הכנס מילה לחיפוש" onBlur={search} className="boxSearch"></input> */}
        
       
  //       <form onSubmit={(e) => search(e)}>
  //       <button className='icon'><ManageSearchIcon></ManageSearchIcon></button>

  //           {/* <Button variant="outlined" type={'submit'} className='button'>חיפוש</Button> */}
  //           <TextField
  //           id="filled-multiline-flexible1"
  //           label='הכנס מילה לחיפוש'
  //           multiline
  //           maxRows={4}
  //           variant="filled"
  //           className='boxSearch'
  //         />
  //         </form>
  //         <br></br><br></br>
  //         <form onSubmit={(e) => searchSome(e)}>
  //       <button className='icon'><ManageSearchIcon></ManageSearchIcon></button>

  //           {/* <Button variant="outlined" type={'submit'} className='button'>חיפוש</Button> */}
  //           <TextField
  //           id="filled-multiline-flexible1"
  //           label='הכנס כמה מילים לחיפוש  '
  //           multiline
  //           maxRows={4}
  //           variant="filled"
  //           className='boxSearch'
  //         />
  //         </form>

  //         <br></br><br></br>

  //         <form onSubmit={(e) => searchOnly(e)}>
  //       <button className='icon'><ManageSearchIcon></ManageSearchIcon></button>

  //           {/* <Button variant="outlined" type={'submit'} className='button'>חיפוש</Button> */}
  //           <TextField
  //           id="filled-multiline-flexible1"
  //           label='  חיפוש המילה לבדה   '
  //           multiline
  //           maxRows={4}
  //           variant="filled"
  //           className='boxSearch'
  //         />
  //         </form>
  //         <br></br><br></br>
  //         <form onSubmit={(e) =>findPlaceSearch(e)}>

  //         <button className='icon'><ManageSearchIcon></ManageSearchIcon></button>
  //         <TextField
  //           id="filled-multiline-flexible1"
  //           label=' חיפוש המילה במיקומים מסוימים '
  //           multiline
  //           maxRows={4}
  //           variant="filled"
  //           className='boxSearch'
  //         />
  //         <br></br>
  //         <select id='select' value={selectedValue} onChange={handleChange} >
  //               <option selected >כל התנך</option>
  //               {list&& list.map(i => <option key={i}value={i.nameParasha}>{i.nameParasha}</option>)} 
  //           </select>
  //           </form>

  //            <br></br><br></br>
  //           <Button variant="outlined" onClick={getTora} className='button'>לצפייה בכל התנך</Button>
  //   </>
    

}