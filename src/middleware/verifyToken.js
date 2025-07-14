import jwt from 'jsonwebtoken'
import {JWT_SECRET} from "../../index.js";


export const verifyToken = (req, res, next) => {
    try {

        let token ;

        const authHeader=req.headers.authorization;
        if(authHeader && authHeader.startsWith('Bearer ')){
            token=authHeader.split('')[1];
        }

        if(!token && req.cookies.token){
            token=req.cookies.token;
        }

        if(!token){
            return res.status(401).json({message:"Unauthorized, Access denied!"});
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