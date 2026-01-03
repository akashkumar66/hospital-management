import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

// create a function to connect database
const connectdb=async()=>{
    try {
         
        const connectioninstance=await mongoose.connect(`${process.env.URI}/${DB_NAME}`)
        console.log(`Mongodb connection Host:${connectioninstance.connection.host}`)
    } catch (error) {
        console.log(`Mongodb connection error is:${error}`)
        process.exit(1)
        
    }

}

export default connectdb;