const mongoose = require('mongoose')

const advertiserSchema = mongoose.Schema({
    email: {
        type: String,
        require: true,
         unique: true,
         match: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    },
    password: {
        type:String,
        require:true
    },
    phone:{
        type:String,
        require:true
    },
    additionalPhone:{
        type:String,
        require:false
    },
    Apartment:[{
        type:mongoose.Types.ObjectId,
        ref:'Apartment',
        require:false
    }]
})

module.exports = mongoose.model('Advertiser', advertiserSchema)