import { ConnectDB } from "../../utils/ConnectDB"
import { Auth } from "../../middleware/auth";
import { ErrorData } from "../../middleware/errorData";

const Me =async(req,res)=>{
  await  ConnectDB();
  const user = await Auth(req);
  if(!user){
    return ErrorData(res,401,"User not found");
  }else{
    return res.status(200).json({Success:true,user})
  }
  }
  
export default Me