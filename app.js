const express = require('express');
const createError = require('http-errors');
const  rate = require('./ratelimit')
const dotenv = require('dotenv').config()


const app = express()


//rate limiter
app.use(rate.limitany)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


const ProductRoutes = require('./Routes/Product.route')

app.use('/products',ProductRoutes)

//conneting mongodb
require('./initDB')()

//404 handler and pass to error handler
app.use((req, res, next) => {
    
    next(createError(404, 'Not found'));
  });
  
  //Error handler
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
      error: {
        status: err.status || 500,
        message: err.message
      }
    });
  });
const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`Server start on port ${PORT}....`)
})



