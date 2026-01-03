import express from "express";

import { adddoctorcontroller, getDoctorProfileController, updateDoctorController, updatedoctorprofileimage } from "../controllers/doctorcontroller.js";
import { upload } from "../middlewares/multer.js";

const doctorrouter=express.Router()

doctorrouter.post("/adddoctor",upload.fields([{name:"profileimage",maxCount:1},{name:"licenseimage",maxCount:1}]),adddoctorcontroller)
doctorrouter.get("/doctorprofile/:id",getDoctorProfileController)
doctorrouter.put("/updatedoctorprofile/:id",updateDoctorController)
doctorrouter.put("/updateddoctorprofileimage/:id",upload.fields([{name:"profileimage",maxCount:1}]),updatedoctorprofileimage)


export default doctorrouter;