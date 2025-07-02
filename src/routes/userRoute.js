import express from "express";
import {getUser, userLogin, userLogout, userRegister, userUpdate} from "../controller/userController.js";
import {verifyToken} from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/register",userRegister)
router.post("/login",userLogin)
router.post("/logout",userLogout)
router.post("/update-user/:id",verifyToken,userUpdate)
router.get("/get-user/:id",verifyToken,getUser)

export default router;