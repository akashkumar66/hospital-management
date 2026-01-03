import {v2 as cloudinary} from "cloudinary";
import fs from "fs"



cloudinary.config(
    {
        cloud_name:process.env.CLOUD_NAME,
        api_key:process.env.API_KEY,
        api_secret:process.env.API_SECRET
    }
)



const uploadcloudinary=async(localfilepath)=>{
    try {

        if(!localfilepath) return null


        const response=await cloudinary.uploader.upload(localfilepath,{
            resource_type:"auto"
        })

        console.log("file uploades successfully on cloudinary",response.url)

        fs.unlinkSync(localfilepath)

        return response



        
    } catch (error) {
        console.log("image upload on cloudinary error",error)
        fs.unlinkSync(localfilepath)
        return null

        
    }

}

export default uploadcloudinary;