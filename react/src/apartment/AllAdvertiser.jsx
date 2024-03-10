
import { useEffect, useState } from 'react'
import './styleHome.css'
import { useSelector } from 'react-redux'
import axios from 'axios'
export const AllAdvertiser = () => {

    const all = useSelector(x => x.all)
    
    const [advertisers, setAdvertisers] = useState()
    useEffect(() => {
        debugger
        axios.get(`http://localhost:3004/advertiser/getAll`)
        // GetAll(p.word)
            .then(x => {
                console.log(x.data);
                setAdvertisers(x.data)
            })
            .catch(err => {
                console.log(err);
                setAdvertisers("jjjjjjjjjj")
            })
    }, [])

    return<>
             <div>
            <h1><mark>:כל המפרסמים</mark></h1>
            <table>
                <thead>
                    <tr>
                        <th>אימייל</th>
                        <th>סיסמא</th>
                        <th>טלפון</th>
                        <th>טלפון נוסף</th>
                        <th>דירות</th>
                    </tr>
                </thead>
                 <tbody>
                </tbody>
            </table> 
     </div>  

    </>
    

}