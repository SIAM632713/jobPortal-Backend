import companyModel from "../models/companyModel.js";
import cloudinary from "../utilitis/cloudinary.js";

export const registerCompany =async(req,res)=>{
    const {name,description,website,location,userId}=req.body;
    let imageURL=""
    try {
        if(req.file){
            const result=await cloudinary.uploader.upload(req.file.path,{
                folder:"CompanyLogo"
            })
            imageURL=result.secure_url;
        }

        const newCompany=await companyModel({
            name,
            description,
            website,
            location,
            logo:imageURL,
            userId
        })
       await newCompany.save()
        res.status(201).json({message:"Company successfully saved"})
    }catch(err){
        res.status(500).json({message:"Error creating companyAPI"})
    }
}


export const getAllcompany=async(req,res)=>{
    try {
        const data=await companyModel.find({})
        if(!data){
            return res.status(404).json({message:"No companyAPI found"})
        }
        res.status(200).json({message:"Company successfully found",data:data})
    }catch(err){

    }
}

export const getCompanybyID=async(req,res)=>{
    const {id} = req.params;
    try {
        const data=await companyModel.findById(id)
        if(!data){
          return res.status(404).json({message:"No companyAPI found"})
        }
        res.status(200).json({message:"Company successfully saved",data:data})
    }catch(err){
        res.status(500).json({message:"Error creating companyAPI"})
    }
}


export const updateCompany=async(req,res)=>{
    const {id} = req.params;
    const {name,description,website,location}=req.body;
    let imageURL=""
    try {
        if(req.file){
            const result=await cloudinary.uploader.upload(req.file.path,{
                folder:"CompanyLogo"
            })
            imageURL=result.secure_url;
        }

        const data=await companyModel.findByIdAndUpdate(id,{
            name:name,
            description:description,
            website:website,
            location:location,
            logo:imageURL
        })
        if(!data){
            return res.status(404).json({message:"No companyAPI found"})
        }
        res.status(200).json({message:"Company successfully updated"})
    }catch(err){
        res.status(500).json({message:"Error updating companyAPI"})
    }
}

export const deleteCompany=async(req,res)=>{
    const {id} = req.params;
    try {
        const data=await companyModel.findByIdAndDelete(id)
        if(!data){
            return res.status(404).json({message:"No company found"})
        }
        res.status(200).json({message:"Company successfully deleted"})
    }catch(err){
        res.status(500).json({message:"Error deleting companyAPI"})
    }
}


export const ListByKeywordCompany=async(req,res)=>{
    try {
        const keyword=req.query.keyword
        const searchRegex={$regex:keyword,$options:"i"};
        const searchQuery={$or:[{name:searchRegex}]}

        const data=await companyModel.find(searchQuery)
        res.status(200).json({message:"Company successfully found",data:data})
    }catch(err){
        res.status(500).json({message:"Error deleting companyAPI"})
    }
}