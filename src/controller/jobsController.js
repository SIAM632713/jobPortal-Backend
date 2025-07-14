import jobModel from "../models/jobmodel.js";


export const jobPosts=async(req,res)=>{
    try {
        const {title,description,requirements,salary,location,jobType,position,companyID,createdBy}=req.body;
        const newPost=await jobModel({
            title,
            description,
            requirements,
            salary,
            location,
            jobType,
            position,
            companyID,
            createdBy
        })
        await newPost.save();
        res.status(201).json({message:"Successfully created post"})
    }catch(err){
        res.status(400).json({message:"Error creating post"})
    }
}


export const getJobPost=async(req,res)=>{
    try {
        const data=await jobModel.find({}).populate("companyID","name")
        if(!data){
            return res.status(404).json({message:"No job post"})
        }
        res.status(200).json({message:"Successfully from job",data: data})
    }catch(err){
      res.status(400).json({message:"Error getting job"})
    }
}

export const getJobPostbyID=async(req,res)=>{
    const {id} = req.params;
    try {
        const data=await jobModel.findById(id).populate("companyID")
        if(!data){
            return res.status(404).json({message:"No job post"})
        }
        res.status(200).json({message:"Successfully found job",data:data})
    }catch(err){
        res.status(400).json({message:"Error getting job"})
    }
}

export const getJobbyCategory=async(req,res)=>{
    const {title}=req.params;
    try {
        const jobData=await jobModel.find({title})

        if(!jobData || jobData.length === 0){
            return res.status(404).json({message:"No job found"})
        }
        res.status(200).json({message:"Job founded successfully",data:jobData})
    }catch(err){

    }
}

export const getjobByFilter=async(req,res)=>{
    try {
        const {keyword,title,location,minSalary,maxSalary}=req.query
        const filter={}

        if(keyword){
            filter.title={$regex: keyword,$options:"i"};
        }

        if(title && title!=="all"){
            filter.title={$regex:title,$options:"i"};
        }

        if(location && location!=="all"){
            filter.location=location
        }

        const min=parseFloat(minSalary)
        const max=parseFloat(maxSalary)

        if(!isNaN(min) && !isNaN(max)){
            filter.salary={$gte:min,$lte:max}
        }else if(!isNaN(min)){
            filter.salary={$gte:min}
        }else if(!isNaN(max)){
            filter.salary={$gte:max}
        }

        const jobData=await jobModel.find(filter).sort({createdAt:-1})

        return res.status(200).json({message:"Successfully found job",data:jobData})
    }catch(err){
      res.status(400).json({message:"Error getting job"})
    }
}

export const ListByKeywordService = async (req, res) => {
    try {
        const keyword = req.query.keyword;

        const SearchRegex = { $regex: keyword, $options: "i" }
        const searchQuery = { $or: [{ title: SearchRegex }]}

        const data = await jobModel.find(searchQuery).populate("companyID","name")

        res.status(200).json({ message: "Successfully found job", data });
    } catch (err) {
        res.status(400).json({ message: "Error getting job", error: err.message });
    }
};


export const deleteJobById=async(req,res)=>{
    const {id} = req.params;
    try {
        const data=await jobModel.findByIdAndDelete(id)
        if(!data){
            return res.status(404).json({message:"No job found"})
        }
        res.status(200).json({message:"Successfully deleted job"})
    }catch (e){
        res.status(400).json({message:"Error getting job"})
    }
}


export const editJobById=async(req,res)=>{
    const {id} = req.params;
    const {title,description,requirements,salary,location,jobType,position}=req.body
    try {
        const data=await jobModel.findByIdAndUpdate(id,{
            title:title,
            description:description,
            requirements:requirements,
            salary:salary,
            location:location,
            jobType:jobType,
            position:position
        })
        if(!data){
            return res.status(404).json({message:"No job found"})
        }
        res.status(200).json({message:"Successfully edited job"})
    }catch(err){
     res.status(400).json({message:"Error getting job"})
    }
}