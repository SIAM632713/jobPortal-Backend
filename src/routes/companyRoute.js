import express from "express";
import {
    registerCompany,
    getCompanybyID,
    getAllcompany,
    updateCompany,
    deleteCompany, ListByKeywordCompany
} from "../controller/companyController.js";
import {verifyToken} from "../middleware/verifyToken.js";
import {verifyRecruter} from "../middleware/verifyRecruter.js";

const router = express.Router();

router.post("/register-company",verifyToken,verifyRecruter,registerCompany)
router.get("/get-company/:id",verifyToken,getCompanybyID)
router.get("/get-allcompany",getAllcompany)
router.post("/update-company/:id",verifyToken,verifyRecruter,updateCompany)
router.post("/delete-company/:id",verifyToken,deleteCompany)
router.get("/get-companysearch",ListByKeywordCompany)

export default router;