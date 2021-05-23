 

const createError = require('http-errors');
const mongoose = require('mongoose');
const Product = require('../Models/Product.model')

module.exports = {
    getAllProducts:async(req,res,next)=>{
        try {
            const results = await Product.find({},{__v:0})
            res.send(results)
        } catch (error) {
            console.log(result)
        }
           
       
       },
    getProductById:async(req,res,next)=>{
        const id = req.params.id;
        try {
        const product= await Product.findById(id,{__v:0})
       
        if(!product){
           throw createError(404,'Product does not exist')
        }
        console.log(product)
        res.send(product)
        } catch (error) {
            console.log(error.message)
            if(error instanceof mongoose.CastError ){
                next(createError(400,"Invalid Product id"))
                return
            }
             next(error)
        }
    },
    deleteElementById:async(req,res,next)=>{
        const id = req.params.id
        try {
            const result = await Product.findByIdAndDelete(id,{__v:0})
            if(!result){
                throw createError(404,'Product does not exist.')
    
            }
            res.send(result)
            console.log(result)
        } catch (error) {
            console.log(error.message)
            if(error instanceof mongoose.CastError){
                next(createError(400,'Invalid Product id'))
                return 
            }
            next(error)
            
        }
    },
    updatingElementbyId:async(req,res,next)=>{   
        const id  = req.params.id
        const updates = req.body
        const options = {new:true}

        try {
            
            const result = await Product.findByIdAndUpdate(id,updates,options)
            if(!result){
                throw createError(404,'Product does not exists')
            }
            res.send(result)
        } catch (error) {
            console.error(error.message)
            if(error instanceof mongoose.CastError){
                next(createError(400,'Invalid Product id'))
                return 
            }
            next(error)
    
            
        }
        
    },
    creatingNewProduct:async(req,res,next)=>{
  

     
        try {
            const product = new Product(req.body)
            const result = await product.save()
            res.send(result)
            
        } catch (error) {
            console.log(error.message)
            if(error.name === 'ValidationError'){
                next(createError(422,error.message))
                return
            }
            next(error)
        }
    }


    


}

