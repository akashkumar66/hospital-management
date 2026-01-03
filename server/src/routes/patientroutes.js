import express from 'express';

import { upload } from '../middlewares/multer.js';
import { addpatientcontroller, getDoctorList, getpatientprofilecontroller, updatepatientcontroller, updatepatientimagecontroller } from '../controllers/patientcontroller.js';


const patientrouter=express.Router();

patientrouter.post("/addpatient",upload.fields([{name:"patientprofileimage",maxCount:1}]),addpatientcontroller);
patientrouter.get("/patientprofile/:id",getpatientprofilecontroller)
patientrouter.put("/updatepatientprofile/:id",updatepatientcontroller)
patientrouter.put("/updatepatientimage/:id",upload.fields([{name:"patientprofileimage",maxCount:1}]),updatepatientimagecontroller)
patientrouter.get("/getdoctors",getDoctorList)


export default patientrouter;