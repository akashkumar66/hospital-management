import express, { json } from "express";
import cors from "cors"
import userrouter from "./routes/userroutes.js";
import doctorrouter from "./routes/doctorroutes.js";
import patientrouter from "./routes/patientroutes.js";

// create instance of express object
const app=express();

// set the origin to run the backend
app.use(cors(
    {
        origin:"http://localhost:8000"
    }
))


app.use(express.static("public"));                          //to access the public/static files
app.use(express.urlencoded({extended:true}));               //parse form data
app.use(express.json());                                    //parse json data



app.use("/Hospital/user",userrouter)
app.use("/Hospital/doctor",doctorrouter)
app.use("/Hospital/patient",patientrouter)


// http://localhost:8000/Hospital/user/register


export {app}



