import mongoose from "mongoose"
import { DB_NAME } from "../constants.js"
import dotenv from 'dotenv'

dotenv.config({
    path: './.env'
})


const connectdb = async ()=>{
    try{
        const connectionIstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`mongdb connected ..with host ${connectionIstance.connection.host}`)
    }
    catch(error){
        console.error(`ERROR:`,error)
        process.exit(1)
    }
}
connectdb()
export default connectdb