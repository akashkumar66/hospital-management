import { Doctormodel } from "../models/doctormodel.js";
import { Usermodel } from "../models/usermodel.js";
import uploadcloudinary from "../utils/cloudinary.js";

const adddoctorcontroller = async(req,res) => {
  try {
    const {
      doctorname,
      age,
      gender,
      degree,
      experience,
      licensenumber,
      address,
      city,
      state,
      pincode,
      department,
      alternatemobileno,
      userID,
    } = req.body;

    if (
      [
        doctorname,
        age,
        gender,
        degree,
        experience,
        licensenumber,
        address,
        city,
        state,
        pincode,
        department,
        alternatemobileno,
        userID,
      ].some((field) => {
        field.trim() === "";
      })
    ) {
      res.status(200).send({
        message: "All fields are required",
        status: "notsuccess",
      });
    }

    const existingdoctor = await Doctormodel.findOne({ userID });

    if (existingdoctor) {
      res.status(200).send({
        message: "Doctor already exist",
        status: "notsuccess",
      });
    }

    const localprofileimagepath = req.files?.profileimage[0]?.path;

    if (!localprofileimagepath) {
      res.status(200).send({
        message: "Profile image is required",
        status: "notsuccess",
      });
    }

    const doctorprofileimage = await uploadcloudinary(localprofileimagepath);

    const locallicenseimagepath = req.files?.licenseimage[0]?.path;

    if (!locallicenseimagepath) {
      res.status(200).send({
        message: "License image is required",
        status: "notsuccess",
      });
    }

    const licenseimage = await uploadcloudinary(locallicenseimagepath);

    const profile = await Doctormodel.create({
      doctorname,
      age,
      gender,
      degree,
      experience,
      licensenumber,
      address,
      city,
      state,
      pincode,
      department,
      alternatemobileno,
      profileimage: doctorprofileimage.url,
      licenseimage: licenseimage.url,
      userID,
    });

    await Usermodel.findByIdAndUpdate(
      userID,
      { isprofilecreated: true },
      { new: true }
    );

    res.status(200).send({
      message: "Doctor profile created successfully",
      status: "success",
      profile,
    });
  } catch (error) {
    res.status(500).send({
      message: `adddoctorcontroller error is ${error}`,
      status: "notsuccess",
    });
  }
};

const getDoctorProfileController = async (req, res) => {
  try {
    const userID = req.params.id;

    const existdoctor = await Doctormodel.findOne({ userID }).populate(
      "userID"
    );

    if (!existdoctor) {
      res.status(200).send({
        message: "Doctor profile not found",
        status: "notsuccess",
      });
    }

    res.status(200).send({
      message: "Proifle fetched successfully",
      status: "success",
      existdoctor,
    });
  } catch (error) {
    res.status(500).send({
      message: `getdoctorprofilecontroller error is : ${error}`,
      status: "notsuccess",
    });
  }
};

const updateDoctorController = async (req, res) => {
  try {
       
       const userID=req.params.id;
       const updateddata=req.body;
     

    const updateddoctor=await Doctormodel.findOneAndUpdate({userID},updateddata,{new:true});

  
    
    res.status(200).send(
      {
        message:"Profile updated successfully",
        status:"success",
        doctor:updateddoctor

      }
    )


  } catch (error) {
    res.status(500).send({
      message: `updatedoctorcontroller error is:${error}`,
      status: "notsuccess",
    });
  }
};


const updatedoctorprofileimage=async(req,res)=>{

  try {
     
     const userID=req.params.id;
     
     const localprofileimagepath = req.files?.profileimage[0]?.path;
     if(!localprofileimagepath){
      res.status(200).send(
        {
          message:"Profile image is cumpoulsory",
          status:"notsuccess"

        }
      )
     }

     const docortprofileimage=await uploadcloudinary(localprofileimagepath);

     const updateddoctor=await Doctormodel.findOneAndUpdate({userID},{profileimage:docortprofileimage.url},{new:true});


     res.status(200).send(
      {
        message:"Profile image is updated",
        status:"success",
        updateddoctor

      }
     )


    
  } catch (error) {
    res.status(500).send(
      {
        message:`error in updatedoctorprofileimagecontroller is:${error}`,
        status:"notsuccess"
      }
    )
    
  }
}

export { adddoctorcontroller, getDoctorProfileController,updateDoctorController,updatedoctorprofileimage };
