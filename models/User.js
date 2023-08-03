import mongoose from "mongoose";
 const UserScheme = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    number:{
        type:Number,
        required:true
    },
    password:{ 
        type:String,
        select:false,
        required:true,
        minLength:[6,"password must be geather then 6 character"]
    }
 })
 mongoose.models = {}
const User = mongoose.model("User",UserScheme);
export default User;