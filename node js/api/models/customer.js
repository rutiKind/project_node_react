const mongoose = require('mongoose')

const CustomerSchema = mongoose.Schema({
    email: {
        type:String,
         unique: true,
         require:true,
         match: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

    },
    password:{
        type:String,
        require:true
    },
    
})

module.exports = mongoose.model('Customer', CustomerSchema)