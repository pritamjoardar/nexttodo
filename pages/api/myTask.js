import { ConnectDB } from "../../utils/ConnectDB"
import Task from "../../models/task.js";
import { ErrorData } from "../../middleware/errorData";
import { Auth } from "../../middleware/auth";
const UserTask =async(req,res)=>{
  await  ConnectDB();
  const user = await Auth(req);
  if(!user){
    ErrorData(res,401,"Login frist");
  }else{
    const task = await Task.find({user:user._id});
    // console.log(task);
    return res.status(200).json({message:true,task})
  }
}
export default UserTask