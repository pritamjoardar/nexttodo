import mongoose from "mongoose"
export const ConnectDB=async()=>{
    await mongoose.connect(process.env.URI).then(()=>{
        console.log("Connected..");
        }).catch((err)=>{
            console.log(err);
        })
    
}