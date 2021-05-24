const  ratelimit = require('express-rate-limit')

rate = {
    limitany:ratelimit({
        windowMs:5000,
        max:5
      }),
     registerpost:ratelimit({
         windowMs:5*60*1000,
         max:2,
         message:{
             code:429,
             message:"you cant register to many product at a time please try after sometime"
         }
             
         
     })
}

module.exports = rate