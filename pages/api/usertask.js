import { ConnectDB } from "../../utils/ConnectDB"
import Task from "../../models/task.js";
import { Auth } from "../../middleware/auth";
import { ErrorData } from "../../middleware/errorData";
const UserTask =async(req,res)=>{
  await  ConnectDB();
  const user = await Auth(req);
  const {title,desc} = req.body;
  if(!title || !desc){
    return ErrorData(res,400,"Fill the proper data");
  }else
    if(!user){
      return ErrorData(res,401,"You have to Login frist");
    }else{
      const Data = new Task({title,desc,user:user._id});
      await Data.save();
      return ErrorData(res,200,"Task Created Successfully");
    }
 
  }
  
export default UserTask