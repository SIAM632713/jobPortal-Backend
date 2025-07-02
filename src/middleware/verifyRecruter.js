export const verifyRecruter = (req, res, next) => {
    if(req.role !== "recruiter"){
        return res.status(403).json({message:"Unauthorized, Access denied!" });
    }
    next()
}