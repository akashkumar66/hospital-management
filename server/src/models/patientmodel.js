import mongoose from "mongoose";

const Patientschema = new mongoose.Schema(
  {
    patientprofileimage: {
      type: String,
      required: true,
    },

    dob:{
       type:String,
       required:true

    },

    patientname: {
      type: String,
      required: true,
    },
    age: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    state: {
      type: String,
      required: true,
    },

    pincode: {
      type: String,
      required: true,
    },

    alternatemobileno: {
      type: String,
      required: true,
    },

    alcohol: {
      type: String,
      required: true,
    },

    smoking: {
      type: String,
      required: true,
    },

    geneticdiseases: {
      type: String,
      required: true,
    },

    bloodgroup: {
      type: String,
      required: true,
    },

    height: {
      type: String,
      required: true,
    },

    weight: {
      type: String,
      required: true,
    },

    allergies: {
      type: String,
      required: true,
    },

    previoussurgeries: {
      type: String,
      required: true,
    },

    exerciseroutine: {
      type: String,
      required: true,
    },

    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  {
    timestamps: true,
  }
);

export const Patientmodel = mongoose.model("patient", Patientschema);
