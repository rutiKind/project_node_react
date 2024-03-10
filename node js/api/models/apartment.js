const { response } = require('express')
const mongoose = require('mongoose')

const apartmentSchema = mongoose.Schema({
    apartmentName: {
        type:String,
        require:false
    },
    description:{
        type:String,
        require:true
    } ,
    pic:{
        type:String,
        require:false
    },
    categoryId:{
        type: mongoose.Types.ObjectId,
        ref: 'Category',
        require:true
    },
    cityId:{
        type:mongoose.Types.ObjectId,
        ref:'City',
        require:true
    },
    address:{
        type:String,
        require:true
    }
    ,
    numBed:{
        type:Number,
        require:true
    },
    addition:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true
    },
    advertiserId:{
        type:mongoose.Types.ObjectId,
        ref:'Advertiser',
        require:true
    }
    
})

module.exports = mongoose.model('Apartment', apartmentSchema)