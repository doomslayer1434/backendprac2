import connectdb from "./db/index.js";
import { app } from "./app.js";
import dotenv from 'dotenv'

dotenv.config({
    path: './.env'
})


connectdb()
.then(()=>{
app.listen(process.env.PORT || 8000,()=>{
    console.log(`Server is running at port http://localhost:${process.env.PORT}`)
})
})
.catch((err)=>{
console.log("MOMGODB connection failed", err);
}
)
















/*import express from 'express'
const app = express()
;( async ()=>{
    try{
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
    app.on('error',(error)=>{
        console.log('error:',error);
        throw error
    })

    app.listen(process.env.PORT , ()=>{
        console.log(`app is listening on port http://localhost:${process.env.PORT}`);
    })


    }
    catch(error){
        console.log(error)
        throw error
    }
})()*/