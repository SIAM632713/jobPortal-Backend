import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import mongoose from "mongoose";
import dotenv from 'dotenv'


const port=process.env.port || 7000;
dotenv.config()

const app = express()
app.use(express.json())
app.use(cors({
    origin: ["http://localhost:5173","https://job-portal-six-brown.vercel.app"],
    credentials: true
}))


app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

export const JWT_SECRET=process.env.JWT_SECRET_KEY

async function main(){
    await mongoose.connect(process.env.UB_URL);

    app.get('/', (req, res) => {
        res.send('Welcome to the Shopping App!');
    })
}
main().then(()=>console.log("mongoDB connected")).catch(err => console.log(err));

import userRoute from "./src/routes/userRoute.js"
import companyRoute from "./src/routes/companyRoute.js"
import jobRoute from "./src/routes/jobRoute.js"
import applicationRoute from "./src/routes/applicationRoute.js";

app.use("/api/user",userRoute)
app.use("/api/company",companyRoute)
app.use("/api/jobs",jobRoute)
app.use("/api/application",applicationRoute)



app.listen(port,()=>{
    console.log(`Server started on port ${port}`)
})