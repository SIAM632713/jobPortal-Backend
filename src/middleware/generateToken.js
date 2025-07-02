import userModel from "../models/usermodel.js";
import jwt from "jsonwebtoken";
import {JWT_SECRET} from "../../index.js";


export const generateToken=async (userID)=>{
    try {
        const user=await userModel.findById(userID)
        if(!user){
            throw new Error("No user found")
        }
        const token=jwt.sign({userID:user._id,role:user.role},JWT_SECRET,{expiresIn:"72h"});
        return token;
    }catch(err){
        console.error(err);
        throw new Error("Unable to generate token");
    }
}