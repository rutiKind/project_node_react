import axios from "axios"


const getToken = () => localStorage.getItem('token');

//כל הדירות למפרסם נוכחי
export const getApartmentByUser = (id) => {
      debugger
     console.log(id);
      const token = getToken();
      return axios.get(`http://localhost:3004/apartment/getByAdvertiser/${id}`,{headers: {
       'Authorization': token
      }
    })
};

// כל הקטגוריות
export const getAllCategory=()=>{
  return axios.get(`http://localhost:3004/categories/getAll`)
}

//כל הערים
export const getAllCity=()=>{
 return  axios.get(`http://localhost:3004/city/getAllCity`)
}

//כל הדירות
export const allApartment=()=>{
  debugger
return axios.get(`http://localhost:3004/apartment/getAll`)
}


//כל הדירות שהמחיר שלהם זול מ-
export const getByPricreLittle=(x)=>{
  debugger
  const token = getToken();
return axios.get(`http://localhost:3004/apartment/getByPricreBig/${x}`,{headers: {
  'Authorization': token
 }
})
}

//כל הדירות שכמות המיטות שלהם גדולה 
export const getByBigBed=(x)=>{
  debugger
  const token = getToken();

   return axios.get(`http://localhost:3004/apartment/getByBigBed/${x}` ,{headers: {
    'Authorization': token
   }
 })
 }

//שכחתי סיסמא
 export const forgetPassword=(email)=>{
  debugger
  return axios.post(`http://localhost:3004/advertiser/forgetPassword/`, { email: email });
  }

  //עדכון סיסמא חדשה
  export const chengePassword=(email,newPassword)=>{
    return axios.put(`http://localhost:3004/advertiser/chengePassword`,{email:email, newPassword:newPassword})
  }

  //שליפת כל הדירות לפי קוד קטגוריה
  export const byCategoryId=(id)=>{
    debugger
    console.log(id);
    const token=getToken()
    return axios.get(`http://localhost:3004/apartment/getByCategoryId/${id}`,{headers: {
      'Authorization': token
     }
   }) 
  }
//שליפת כל הדירות לפי קוד עיר
   export const byCityId=(id)=>{
    debugger
    console.log(id);
    const token=getToken()
    return axios.get(`http://localhost:3004/apartment/getByCityId/${id}`,{headers: {
      'Authorization': token
     }
   }) 
  }

  //הזמנת דירה
  export const booking = (id) => {
    debugger
    const token = getToken();
    const user = JSON.parse(localStorage.getItem('currentUser')); 
    const email = user.email;
    return axios.post(`http://localhost:3004/apartment/apartmentDetails`, { apartment: id, email: email }, {
      headers: {
        'Authorization': token 
      }
    });
  }

  //עדכון דירה
  export const updateA = (formData) => {
    debugger
    return axios.put(`http://localhost:3004/apartment/update`, formData, {
              headers: {
                  'Content-Type': 'multipart/form-data' 
              }
          }); 
         }

  //התחברות לקוח
  export const loginClient=(user)=>{
    debugger
    return axios.post(`http://localhost:3004/customer/login`,user)
  }

  //הרשמה לקוח
  export const registerClient=(user)=>{
    debugger
    return axios.post(`http://localhost:3004/customer/register`,user)
  }

    //הרשמה מפרסם
    export const registerAdver=(user)=>{
      debugger
      return axios.post(`http://localhost:3004/advertiser/register`,user)
    }

      //התחברות מפרסם
      export const loginAdver=(user)=>{
        debugger
        return axios.post(`http://localhost:3004/advertiser/login`,user)
      }

      //מחיקת דירה
      export const deleteApartments=(apartmentId)=>{
        debugger
        return axios.delete(`http://localhost:3004/apartment/delete/${apartmentId}`)
      }
      
      //הוספת דירה
      export const addApartment = (formData) => {
        debugger
        return axios.put(`http://localhost:3004/apartment/update`, formData, {
                  headers: {
                      'Content-Type': 'multipart/form-data' 
                  }
              });  
             }

      //הוספת עיר
       export const addCit=(cityName)=>{
         debugger
         return axios.post(`http://localhost:3004/city/createCity/`, cityName);
          }

       //הוספת קטגוריה
          export const addCategor=(categoryName)=>{
            debugger
          return axios.post(`http://localhost:3004/categories/create/`, categoryName);
             }






