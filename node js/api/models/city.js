const mongoose = require('mongoose')

const CitySchema = mongoose.Schema({
    cityName: {
        type: String,
        require:true
    },
    // cityId:{
    //     type:Number,
    //     require:true
    // },
    Apartment:[{
        type:mongoose.Types.ObjectId,
        ref:'Apartment',
        require:true
    }]
})

module.exports = mongoose.model('City', CitySchema)