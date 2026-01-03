import mongooose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"


// creating a structure(Schema) to store the data using
const Userschema=new mongooose.Schema(
    {
    
        email:{
            type:String,
            required:true,
            unique:true,
            
        },

        mobileno:{
            type:String,
            unique:true,
            required:true
        },

        password:{
            type:String,
            required:true,
        },

        isprofilecreated:{
            type:Boolean,
            default:false
        },

        usertype:{
            type:String,
            required:true
        }
        

    },
    {
        timestamps:true
    }
)



// check if modified before save and hash password if modified
Userschema.pre("save",async function(next){
    if(!this.isModified("password")) return next();
    
    this.password=await bcrypt.hash(this.password , 10)
    next();

})


// check if password match or not
Userschema.methods.ispasswordCorrect=async function(password) {
    return await bcrypt.compare(password,this.password)

    
}


// generate token for auth
Userschema.methods.generateaccesstoken=async function () {
    return jwt.sign(
        {
            id:this._id,
            email:this.email,


        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:"2d"
        }

    )
    
}

export const Usermodel=mongooose.model("user",Userschema);