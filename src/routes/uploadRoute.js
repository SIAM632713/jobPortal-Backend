import express from "express";
import multer from "multer";
import cloudinary from "../utilitis/cloudinary.js";
import fs from 'fs'

const router = express.Router();
const storage=multer.diskStorage({})
const upload=multer({
    storage,
    fileFilter: (req, file, cb) => {
        const allowed= [
            'image/jpeg',
            'image/png',
            'image/webp',
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ];

        if(allowed.includes(file.mimetype)){
            cb(null, true);
        }else {
            cb(new Error('Unsupported file type'),false);
        }
    }
})

router.post("/",upload.single("image"),async (req,res)=>{
    try {
        const result=await cloudinary.uploader.upload(req.file.path,{
            overwrite:true,
            invalidate:true,
            resource_type:"auto"
        });
        fs.unlinkSync(req.file.path);
        res.status(200).json({url:result.secure_url});
    }catch(err){
        console.log(err)
        res.status(500).json({message:"Image upload failed.",error:err})
    }
})

export default router;