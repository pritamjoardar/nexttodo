export const ErrorData =(res,statusCode = 500,message = "Internal Server Error")=>{
    return res.status(statusCode).json({message:message});
}