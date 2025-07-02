import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    fullname:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    phone:{type:Number,required:true},
    role:{
        type:String,
        enum:['student','recruiter']
    },
    bio:{type:String},
    skills:{type:String},
    resume:{type:String},
    resumeOriginalName:{type:String},
    company:{type:mongoose.Schema.Types.ObjectId,ref:"Company"},
    profilePhoto:{type:String},
},{timestamps:true});
export const userModel=mongoose.model('User',userSchema);
export default userModel;
