import mongoose from "mongoose";

const Doctorschema=new mongoose.Schema(
    {
         profileimage:{
            type:String,
            required:true
         },

         licenseimage:{
            type:String,
            required:true

         },

         licensenumber:{
            type:String,
            required:true

         },

         doctorname:{
            type:String,
            required:true,
         },

         degree:{
            type:String,
            required:true
         },
         experience:{
            type:Number,
            required:true,

         },
         age:{
            type:String,
            required:true
         },
         gender:{
            type:String,
            required:true
         },

         address:{
            type:String,
            required:true

         },

         city:{
            type:String,
            required:true
         },

         state:{
            type:String,
            required:true

         },

         pincode:{
            type:String,
            required:true,
         },

         alternatemobileno:{
            type:String,
            required:true

         },
         department:{
            type:String,
            required:true,
         },
         isavailabel:{
            type:Boolean,
            default:false
         },

         userID:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"user"
         }


    },
    {
        timestamps:true

    }
)


export  const Doctormodel=mongoose.model("doctor",Doctorschema)