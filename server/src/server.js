import express from "express";
import connectdb from "./db/db.js";
import dotenv from "dotenv"
import { app } from "./app.js";


// provide the path to access .env variables
dotenv.config(
    {
        path:"./env"
    }
)


// connection of db using function and listen the application
connectdb()
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`Server is running on port:${process.env.PORT}`)
    })
})
.catch((error)=>{
    console.log("mongodb connection error",error)


})