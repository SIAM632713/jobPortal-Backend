import userModel from "../models/usermodel.js";
import bcrypt from "bcryptjs";
import {generateToken} from "../middleware/generateToken.js";
import cloudinary from "../utilitis/cloudinary.js";

export const userRegister=async(req,res)=>{
    try {
        const {fullname,email,phone,password,role}=req.body;

        let imageURL=""
            if(req.file){
                const result=await cloudinary.uploader.upload(req.file.path,{
                    folder:"UserImage"
                })
                imageURL=result.secure_url;
            }

        const user=await userModel.findOne({email})
        if(user){
            return res.status(400).send({message:"Email already exists"})
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const newUser=await userModel({
            fullname,
            email,
            phone,
            password:hashedPassword,
            role,
            profilePhoto:imageURL
        })
        await newUser.save()
        res.status(201).send({message:"Successfully registered"})
    }catch(err){
        res.status(500).send({message:"Something went wrong"})
    }
}


export const userLogin=async(req,res)=>{
    try {
        const {email,password}=req.body;
        const user=await userModel.findOne({email})
        if(!user){
            return res.status(400).send({message:"Email not found"})
        }
        const validPassword=await bcrypt.compare(password,user.password)
        if(!validPassword){
            return res.status(400).send({message:"Invalid password"})
        }
        const token=await generateToken(user._id)
        res.cookie("token",token,{httpOnly:true,secure:true,sameSite:'None'})
        res.status(200).send({message:"Successfully logged in",token,user:{
            _id:user._id,
                fullname:user.fullname,
                email:user.email,
                role:user.role,
                profilePhoto:user.profilePhoto
            }})
    }catch(err){
     console.log(err)
        res.status(500).send({message:"Something went wrong"})
    }
}


export const userLogout=async(req,res)=>{
    try {
        res.clearCookie("token")
        res.status(200).send({message:"Successfully logged out"})
    }catch (e){
        console.log(e)
        res.status(500).send({message:"Something went wrong"})
    }
}


export const userUpdate=async(req,res)=>{
    const {id}=req.params;
    const {fullname,phone,bio,skills}=req.body;
    let imageURL=""
    try {
        if(req.file){
            const result=await cloudinary.uploader.upload(req.file.path,{
                folder:"Resume",
                resource_type: "auto",
            })
            imageURL=result.secure_url;
        }
        const user=await userModel.findByIdAndUpdate(id,{
            fullname,
            phone,
            bio,
            resume:imageURL,
            skills
        },{new:true})
        if(!user){
            return res.status(400).send({message:"User not found"})
        }
        res.status(200).send({message:"User update successfull"})
    }catch(err){
        res.status(500).send({message:"Something went wrong"})
    }
}


export const getUser=async(req,res)=>{
    const {id}=req.params;
    try {
        const data=await userModel.findById(id)
        if(!data){
            return res.status(400).send({message:"User not found"})
        }
        res.status(200).send({message:"User found successfull",data:data})
    }catch(err){
        res.status(500).send({message:"Something went wrong"})
    }
}