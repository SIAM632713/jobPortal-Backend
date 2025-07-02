import express from 'express'
import {
    deleteJobById, editJobById,
    getJobbyCategory,
    getjobByFilter,
    getJobPost,
    getJobPostbyID,
    jobPosts, ListByKeywordService
} from "../controller/jobsController.js";
import {verifyToken} from "../middleware/verifyToken.js";
import {verifyRecruter} from "../middleware/verifyRecruter.js";

const router = express.Router()

router.post("/job-post",verifyToken,verifyRecruter,jobPosts)
router.get("/get-alljob",getJobPost)
router.get("/get-jobs/:id",getJobPostbyID)
router.get("/get-jobcategory/:title",getJobbyCategory)
router.get("/get-jobquery",getjobByFilter)
router.get("/get-jobsearch",ListByKeywordService)
router.delete("/delete-job/:id",verifyToken,verifyRecruter,deleteJobById)
router.post("/update-job/:id",verifyToken,verifyRecruter,editJobById)

export default router