import { useNavigate, useParams } from "react-router-dom"
import './styleHome.css'

export const Details=()=>{
debugger
  let p=useParams()
  debugger
  console.log(p)
let nav=useNavigate()
  const back=()=>{
    nav(`/`)
  }

  
  return<>
  <p  key={p.word}className="p">{p.word}</p>
  {/* <button onClick={back}>חזרה לעמוד הקודם</button> */}
  </>  
}