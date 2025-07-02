import express from 'express';
import {
    applyJobs,
    getApplicantAdminUser, getApplicantUser,
    getApplicationjob,
    updateStatus
} from "../controller/applicationController.js";
import {verifyToken} from "../middleware/verifyToken.js";
import {verifyRecruter} from "../middleware/verifyRecruter.js";

const router = express.Router();

router.post("/apply-job/:id",verifyToken,applyJobs)
router.get("/getApplied-job",getApplicationjob)
router.get("/Appliedjob-user/:id",verifyToken,verifyRecruter,getApplicantAdminUser)
router.get("/applicant-user/:id",verifyToken,getApplicantUser)
router.post("/update-status/:id",verifyToken,verifyRecruter,updateStatus)

export default router;