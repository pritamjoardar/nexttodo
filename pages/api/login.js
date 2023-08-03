import { ConnectDB } from "../../utils/ConnectDB"
import { ErrorData } from "../../middleware/errorData";
import User from "../../models/User.js"
import bcrypt from "bcrypt"
import { CookieSeter, GenerateToken } from "../../utils/cookieSeter";
const Login = async(req,res)=>{
    await  ConnectDB();
    const {email,password} = req.body;
    if(!email || ! password){
        return ErrorData(res,400,"Fill tha from Properly");
    }
    const UserData = await User.findOne({email}).select("+password");
    if( !UserData){
        return ErrorData(res,400,"Invalid Email and Password");
    }
    else{
        const compare = await bcrypt.compare(password,UserData.password);
        if(!compare){
        return ErrorData(res,400,"Invalid Email and Password");
        }else{
            const token = GenerateToken(UserData._id);
            CookieSeter(res,token,true)
            
            return res.status(200).json({message:`Welcome Back ${UserData.name}`,UserData});
        }
    }
   
}

export default Login