import applicationModel from "../models/applicationModel.js";
import jobModel from "../models/jobmodel.js";


export const applyJobs = async (req, res) => {
    try {
        const userID = req.userID;
        const jobID = req.params.id;

        if (!jobID) {
            return res.status(400).send({ error: "Job ID required" });
        }

        // Check if user already applied
        const existingApplication = await applicationModel.findOne({
            job: jobID,
            applicant: userID,
        });

        if (existingApplication) {
            return res.status(400).send({ error: "You already applied" });
        }

        // Create new application
        const newApplication = await applicationModel.create({
            job: jobID,
            applicant: userID,
        });


        const job = await jobModel.findById(jobID);
        if (!job) {
            return res.status(404).json({ error: "Job not found" });
        }

        job.application.push(newApplication._id);
        await job.save();

        res.status(200).json({ message: "Application created" });
    } catch (err) {
        console.error("Apply Job Error:", err);
        res.status(500).send({ error: "Server error" });
    }
};



export const getApplicationjob=async (req, res)=>{
    try {
        const userID=req.id;
        const applications = await applicationModel
            .find({ applicant: userID })
            .sort({ createdAt: -1 })
            .populate({
                path: "job",
                populate: {
                    path: "companyID",
                    model: "Company",
                },
            });
        if(!applications){
            return res.status(404).send({error:"No application found"});
        }
        res.status(200).json({message:"Application found",data:applications});
    }catch(err){
   res.status(500).send({error:"Server error"});
    }
}


export const getApplicantAdminUser = async (req, res) => {
    try {
        const { id } = req.params;

        const applications = await applicationModel.find({ job: id })
            .populate({
                path: "applicant",
                model: "User",
                select: "-password -__v -createdAt -updatedAt"
            });

        res.status(200).json({
            message: "Application users found",
            data:applications
        });
    } catch (err) {
        console.error("Error in getApplicantUser:", err);
        res.status(500).json({ error: "Server error" });
    }
};


export const getApplicantUser=async (req, res) => {
    try {
        const { id } = req.params;
        const applications=await applicationModel.find({applicant:id})
            .populate({
                path: "job",
                model: "Job",
            })
        res.status(200).json({
            message: "Application users found",
            data:applications
        })
    }catch(err){
        res.status(500).send({error:"Server error"});
    }
}


export const updateStatus=async(req, res)=>{
    try {
        const {id}=req.params
        const { status } = req.body;
         const updateApplicantstatus=await applicationModel.findByIdAndUpdate(id,{status:status},{new:true})
         if(!updateApplicantstatus){
             return res.status(400).json({error:"Applicant not found"});
         }
        res.status(200).json({message:"Application status updated"});
    }catch(err){
    res.status(500).send({error:"Server error"});
    }
}
