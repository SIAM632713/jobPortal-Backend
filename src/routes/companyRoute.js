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
import upload from "../utilitis/multer.js";

const router = express.Router();

router.post("/register-company",upload.single("logo"),verifyToken,verifyRecruter,registerCompany)
router.get("/get-company/:id",verifyToken,getCompanybyID)
router.get("/get-allcompany",getAllcompany)
router.post("/update-company/:id",upload.single("logo"),verifyToken,verifyRecruter,updateCompany)
router.post("/delete-company/:id",verifyToken,deleteCompany)
router.get("/get-companysearch",ListByKeywordCompany)

export default router;