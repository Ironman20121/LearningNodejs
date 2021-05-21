const express = require('express')

const mongoose = require('mongoose')

const createError = require('http-errors')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


const ProductRoutes = require('./Routes/Product.route')
const { create } = require('./Models/Product.model')
app.use('/products',ProductRoutes)

mongoose.connect('mongodb+srv://cluster0.bwgam.mongodb.net/',{
    user:'kundan',
    pass:'murali1234',
    dbName:'learningdb',
    useNewUrlParser:true,
    useUnifiedTopology: true,
    useFindAndModify:false 
}).then(()=>{
    console.log('mongodb conneted ....')
}).catch((err)=>{
    console.log(err)
})


//basic middle ware
// app.use((req,res,next)=>{
//     res.status(404)
//     res.send({
//         error:'Not found'
//     })
// })

// app.all('/test',(req,res)=>{
    // console.log(req.query)
    // res.send(req.query)
    // console.log(req.params)
    // res.send(req.params)
//     console.log(req.body)
//     res.send(req.body)
// })

//middle ware erroe handler
app.use((req,res,next)=>{
    next(createError(404,'Not found'))
  })


app.use((err,req,res,next)=>{
    //this can called from any whre eg routes next()
    res.status(err.status||500)
    res.send({
        error:{
            status:err.status||500,
            message:err.message,
        }
    })
})


app.listen(3000,()=>{
    console.log('sever started on port 3000.....')
})