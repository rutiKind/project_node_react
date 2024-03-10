import axios from "axios"

export const GetAll = (word) => {
    //axios.apiRequestType = סוג קריאת השרת
    //get = שליפה
    //לא מקבלת פרמרטים בגוף הבקשה!
    return axios.get(`https://localhost:3001/GetLocation/${word}`)
}
