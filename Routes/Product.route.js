const express = require('express')


const router = express.Router();

const Product = require('../Models/Product.model')
//get all products
router.get('/',async(req,res,next)=>{
 try {
     const results = await Product.find({},{__v:0})
     res.send(results)
 } catch (error) {
     console.log(result)
 }
    

})
//creating new product
router.post('/',async(req,res,next)=>{
  

    // using promises 
    // product.save()
    //         .then(result=>{
    //             console.log(result)
    //             res.send(result)
    //         })
    //         .catch(err =>{
    //             console.log(err)
    //             res.send(err.message)
    //         })
     
    try {
        const product = new Product(req.body)
        const result = await product.save()
        res.send(result)
        
    } catch (error) {
        console.log(error.message)
        
    }
})

router.get('/:id',async(req,res,next)=>{
    const id = req.params.id;
    try {
    const product= await Product.findById(id)
        res.send(product)
    } catch (error) {
        console.log(error.message)
    }
})

router.patch('/:id',async(req,res,next)=>{   
    const id  = req.params.id
    const updates = req.body
    const options = {new:true}
    try {
        
        const result = await Product.findByIdAndUpdate(id,updates,options)
        res.send(result)
    } catch (error) {
        console.error(error.message)
    }
    
})

router.delete('/:id',async(req,res,next)=>{
    const id = req.params.id
    try {
        const result = await Product.findByIdAndDelete(id)
        res.send(result)
        console.log(result)
    } catch (error) {
        console.log(error.message)
        
    }
})
module.exports = router;
