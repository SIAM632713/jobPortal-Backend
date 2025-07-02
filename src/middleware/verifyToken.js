import jwt from 'jsonwebtoken'
import {JWT_SECRET} from "../../index.js";


export const verifyToken = (req, res, next) => {
    try {
        const token=req.cookies.token;
        if(!token){
            return res.status(400).send({message:"Token not found"})
        }
        const decoded=jwt.verify(token,JWT_SECRET)
        if(!decoded.userID){
            return res.status(400).send({message:"Token not verified"})
        }
        req.userID=decoded.userID;
        req.role=decoded.role;
        next()
    }catch(err){
        return res.status(400).send({message:"Token not verified"})
    }
}