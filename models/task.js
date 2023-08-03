import mongoose from "mongoose";
 const TaskScheme = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    isCompleted:{
        type:Boolean,
        default:false
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    createAt:{
        type:Date,
        default:Date.now
    }
   
 })
 mongoose.models = {}
 const Task = mongoose.model("Task",TaskScheme);
 export default Task;