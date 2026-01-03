import { Doctormodel } from "../models/doctormodel.js";
import { Patientmodel } from "../models/patientmodel.js";
import { Usermodel } from "../models/usermodel.js";
import uploadcloudinary from "../utils/cloudinary.js";

const addpatientcontroller = async (req, res) => {
  //taking the input from the user through form
  try {
    const {
      patientname,
      age,
      gender,
      address,
      city,
      state,
      pincode,
      alternatemobileno,
      alcohol,
      height,
      weight,
      smoking,
      dob,
      geneticdiseases,
      bloodgroup,
      allergies,
      previoussurgeries,
      exerciseroutine,
      userID,
    } = req.body;

    console.log(req.body);

    //check if the input feild is empty or not

    if (
      [
        patientname,
        age,
        gender,
        address,
        city,
        state,
        pincode,
        alternatemobileno,
        alcohol,
        height,
        weight,
        smoking,
        dob,
        geneticdiseases,
        bloodgroup,
        allergies,
        previoussurgeries,
        exerciseroutine,
        userID,
      ].some((feild) => {
        feild.trim() == "";
      })
    ) {
      res.status(200).send({
        message: `All fields are required`,
        status: "notsuccess",
      });
    }

    //check if the patient is already exist or not

    const existpatient = await Patientmodel.findOne({ userID });

    if (existpatient) {
      res.status(200).send({
        message: "Patient already exist",
        status: "notsuccess",
      });
    }

    const localpatientimagepath = req.files?.patientprofileimage[0]?.path;

    if (!localpatientimagepath) {
      res.status(200).send({
        message: "Profile image is required",
        status: "notsuccess",
      });
    }

    const patientprofileimage = await uploadcloudinary(localpatientimagepath);

    const profile = await Patientmodel.create({
      patientname,
      age,
      gender,
      address,
      city,
      state,
      pincode,
      alternatemobileno,
      alcohol,
      height,
      weight,
      smoking,
      dob,
      geneticdiseases,
      bloodgroup,
      allergies,
      previoussurgeries,
      exerciseroutine,
      patientprofileimage: patientprofileimage.url,
      userID,
    });

    await Usermodel.findByIdAndUpdate(
      userID,
      { isprofilecreated: true },
      { new: true }
    );

    res.status(200).send({
      message: "Profile created successfully",
      status: "success",
      profile,
    });

    //catch the error if api doesnot hit or errror in patient controller
  } catch (error) {
    res.status(500).send({
      message: `addpatientcontroller error : ${error}`,
      status: "notsuccess",
    });
  }
};

const getpatientprofilecontroller = async (req, res) => {
  try {
    const userID = req.params.id;

    const existpatient = await Patientmodel.findOne({ userID }).populate(
      "userID"
    );

    if (!existpatient) {
      res.status(200).send({
        message: "patient profile not found",
        status: "notsuccess",
      });
    }

    res.status(200).send({
      message: "Profile fetched successfully",
      status: "success",
      existpatient,
    });
  } catch (error) {
    res.status(500).send({
      message: `getpatientprofilecontroller error ${error}`,
      status: "notsuccess",
    });
  }
};

const updatepatientcontroller = async (req, res) => {
  try {
    const userID = req.params.id;
    const updateddata = req.body;

    const updatepatient=await Patientmodel.findOneAndUpdate({userID},updateddata,{new:true});

    res.status(200).send(
      {
        message:"Profile updated successfully",
        status:"success",
        patient:updatepatient

      }
    )

  } catch (error) {
    res.status(500).send({
      message: `updatepatientcontroller error ${error}`,
      status: "notsuccess",
    });
  }
};

const updatepatientimagecontroller=async (req,res)=>{
  try {
      const userID=req.params.id;

      const localprofileimagepath = req.files?.patientprofileimage[0]?.path;
      if(!localprofileimagepath){
      res.status(200).send(
        {
          message:"Profile image is cumpoulsory",
          status:"notsuccess"

        }
      )
     }

     const newpatientprofileimage=await uploadcloudinary(localprofileimagepath);
      const updatepatient=await Patientmodel.findOneAndUpdate({userID},{patientprofileimage:newpatientprofileimage.url},{new:true});

      res.status(200).send(
      {
        message:"Profile image is updated",
        status:"success",
        updatepatient

      }
     )

  } catch (error) {
      res.status(500).send(
        {
          message:`updatepatientimagecontroller error ${error}`,
          status: "notsuccess"
        }
      )
  }
}


const getDoctorList=async(req,res)=>{
  try {

    const page=parseInt(req.query.page) || 1;
    const limit=parseInt(req.query.limit) || 10;

    const skip=(page-1)*limit;

    // filter

    // const {experience, minexp, maxexp}=req.query;
    // const filter={};

    // if(experience){
    //   filter.experience=Number(experience);
    // }

    // if(minexp || maxexp){
    //   filter.experience={};

    //   if(minexp) filter.experience.$gte=Number(experience);
    //   if(maxexp) filter.experience.$lte=Number(experience);
    // }

    const doctors=await Doctormodel.find()
    .skip(skip)
    .limit(limit)
    .sort({createdAt:-1});


    // const doctors=await Doctormodel.find().skip(skip).limit(limit).sort({createdAt:-1});

    const total=await Doctormodel.countDocuments();


    res.status(200).send(
      {
        message:"Doctor list fetched successfully",
        doctors,
        pagination:{
          totalrecords:total,
          totalpages:Math.ceil(total/limit),
          limit,


        }

      }
    )


    
  } catch (error) {
    res.status(500).send(
      {
        message:`get doctorlist error is:${error}`,
        status:"notsuccess"
      }
    )
  }
}

export { addpatientcontroller, getpatientprofilecontroller, updatepatientcontroller, updatepatientimagecontroller,getDoctorList };
