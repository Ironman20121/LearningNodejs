const mongoose = require('mongoose')
const Schema = mongoose.Schema


const ProductSchama = new Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,
    }

})
const Product  = mongoose.model('product',ProductSchama)
module.exports = Product