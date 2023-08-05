import { ConnectDB } from "../../../utils/ConnectDB.js";
import Task from "../../../models/task.js";
import { ErrorData } from "../../../middleware/errorData.js";
import { Auth } from "../../../middleware/auth.js";
const UserTask =async(req,res)=>{
  await  ConnectDB();
  const user = await Auth(req);
  if(!user){
    ErrorData(res,401,"Login frist");
  }else{
    const TaskId= req.query.id;
     if(req.method==='DELETE'){
      if(!TaskId){
      return ErrorData(res,400,"This methood is not avaliable");
      }else if(TaskId){
        const Data = await Task.findByIdAndDelete(TaskId);
      Data.save();
      return ErrorData(res,200,"Task Deleted");
      }
      
    }else if(req.method==='PUT'){
      const {title,desc} = req.body;
      const Data = await Task.findById(TaskId);
      if(!title || !desc){
        return ErrorData(res,400,"Fill the proper data");
      }else{
        if(!Data){
          return ErrorData(res,401,"Data not found");
        }else{
          const TaskData  = await Task.findByIdAndUpdate(TaskId,{title,desc})
          await TaskData.save();
          return res.status(200).json({success:"Data successfully updated"});
        }
       
      }
     
    }else{
      return ErrorData(res,400,"This methood is not avaliable");
    }
  }
}
export default UserTask