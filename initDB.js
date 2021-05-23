const mongoose = require('mongoose')


module.exports = ()=> {
    
mongoose.connect(process.env.MONGODB_URI,{
    user:process.env.DB_USER,
    pass:process.env.DB_PASS,
    dbName:process.env.DB_NAME,
    useNewUrlParser:true,
    useUnifiedTopology: true,
    useFindAndModify:false 
}).then(()=>{
    console.log('mongodb conneted ....')
}).catch((err)=>{
    console.log(err.message)
})

mongoose.connection.on('connected',()=>{
    console.log("mongoose connected to db..")
})

mongoose.connection.on('error',(err)=>{
    console.log(err)
})

mongoose .connection.on('disconnected',()=>{
    console.log('mongoose disconned db..')
})

process.on('SIGINT',()=>{
    mongoose.connection.close(() =>{
        console.log("Mongoose connection is disconted")
        process.exit(0)
    })  
})


}