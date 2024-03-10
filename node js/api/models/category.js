const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
//     categoryId:{
//     type: Number,
//     require:true
// },
    categoryName:{
        type:String,
        require:true
    } ,
    Apartment:[{
        type:mongoose.Types.ObjectId,
        ref:'Apartment',
    }]
})

module.exports = mongoose.model('Category', categorySchema)