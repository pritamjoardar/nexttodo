import jwt from "jsonwebtoken"
import User from "../models/User";
export const Auth =async (req)=>{
    const cookie  = req.headers.cookie;
    if(!cookie) return null;
        const token = req.headers.cookie.split("=")[1];
        const decode = await jwt.verify(token,process.env.KEY);
        return await User.findById(decode._id)
}