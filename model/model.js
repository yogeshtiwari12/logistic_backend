import { Role } from "appwrite";
import mongoose from "mongoose";

const schema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    phone:{
        type: String,
        required: true,
        unique: true
    },
    role:{
        type:String,
        required:true,
        enum: ['admin', 'user']  
    },
    password:{
        type: String,
        required: true,
        unique: true
    },
    comment_data:{
        type:String
    },
    rating:{
        type: Number
    }

})

const User = mongoose.model('User', schema);
export default User;