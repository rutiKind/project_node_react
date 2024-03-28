const City=require("../models/city")
const axios = require('axios');
const apiKey = 'bceb6f0a4a193a7f3b995a342d400279'


module.exports = {

    getCityCode: async(req,res)=> {
        try {
           const cityId=await req.params.cityId
           console.log(cityId);
           const city=await City.findOne({ _id: cityId })
           const cityName=city.cityName
           console.log(cityName);
           const response = await axios.get(`http://api.openweathermap.org/data/2.5/find?q=${encodeURIComponent(cityName)}&appid=${apiKey}`);
           const cityData = response.data;
            console.log(cityData);
            console.log(cityData.list[0].main);
          if (cityData.count > 0) {
            const cityTemp=cityData.list[0].main
            const cityCode = cityData.list[0].id;
            console.log(cityCode);
            res.status(200).send(cityTemp)
          } else {
            console.log('City not found.');
            return null;
          }
        } catch (error) {
          console.error('Error:', error.message);
         // throw error;
        }
      },

//get all cities
getAllCity: (req, res) => {
    City.find()
        .then((cities) => {
            res.status(200).send(cities)
        })
        .catch((error) => {
            res.status(404).send({ error: error.message })
        })
},


//add city
createCity: (req, res) => {
    const {
        cityName,
    } = req.params
    console.log(req.params);
    const Apartment=[]
    const city = new City({  cityName ,Apartment})
    console.log(city);
    city.save()
        .then((city) => {
            res.status(200).send(`Create city ${city._id} succeed`);
        })
        .catch((error) => {
            res.status(404).send({ message: error.message });
        });
    },

}
