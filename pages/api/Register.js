import { ConnectDB } from "../../utils/ConnectDB"
import { ErrorData } from "../../middleware/errorData";
import User from "../../models/User.js"
import bcrypt from "bcrypt"
import { CookieSeter, GenerateToken } from "../../utils/cookieSeter";
const Register = async(req,res)=>{
    await  ConnectDB();
    const {name,email,number,password} = req.body;
    const UserData = await User.findOne({email});
    if(UserData){
        return ErrorData(res,403,"User is already exist");
    }else{
        const Hash = await bcrypt.hash(password,10);
        const Data = new User({name,email,number,password:Hash});
    await Data.save();
    const token = GenerateToken(Data._id);
    CookieSeter(res,token,true)
    return res.status(200).json({message:`Welcome ${Data.name}`,Data});
    }
    
}

export default Register