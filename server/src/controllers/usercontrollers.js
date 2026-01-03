import { Usermodel } from "../models/usermodel.js";

const registercontroller=async(req,res)=>{
    try {
        // step 1 get all fileds from body/form/frontend

        const {email,mobileno,password,usertype}=req.body;


        // step 2 check all fileds are required

        if([email,mobileno,password,usertype].some((field)=>{
            field.trim()===""
        })){
            res.status(200).send(
                {
                    message:"All fields are required",
                    status:"notsuccess"
                }
            )
        }


        // step 3 already register or not


        const existinguser=await Usermodel.findOne({email});

        if(existinguser){
            return res.status(200).send({
                message:"User already registered",
                status:"notsuccess"
            })
        }


        const createuser=await Usermodel.create({
            email,
            password,
            mobileno,
            usertype,
        })


        res.status(200).send(
            {
                message:"User register successfully",
                status:"success",
            }
        )
        
    } catch (error) {
        res.status(500).send(
            {
                message:`registercontroller error is :${error}`,
                status:"notsuccess"
            }
        )
        
    }

 

}

const logincontroller=async(req,res)=>{
    try {
        // step 1 get all fileds from body/form/frontend

        const {email,password,usertype}=req.body;


        // step 2 check all fileds are required

        if([email,password,usertype].some((field)=>{
            field.trim()===""
        })){
            res.status(200).send(
                {
                    message:"All fields are required",
                    status:"notsuccess"
                }
            )
        }

        const loginuser=await Usermodel.findOne({email,usertype})
        // console.log(loginuser)

        if(!loginuser){
            res.status(200).send(
                {
                    message:"User not found",
                    status:"notsuccess"
                }
            )
        }


        const matchpassword=await loginuser.ispasswordCorrect(password)

        if(!matchpassword){
            res.status(200).send(
                {
                    message:"Email or password does not match",
                    status:"notsuccess"
                }
            )
        }


        const token=await loginuser.generateaccesstoken()


        res.status(200).send(
            {
                message:"Login successfully",
                status:"success",
                userID:loginuser._id,
                isprofilecreated:loginuser.isprofilecreated,
                usertype:loginuser.usertype,
                token,
                
            }
        )




      
    } catch (error) {
        res.status(500).send(
            {
                message:`logincontroller error is :${error}`,
                status:"notsuccess"
            }
        )
    }
}



export {registercontroller,logincontroller}