import { ConnectDB } from "../../utils/ConnectDB"
import { ErrorData } from "../../middleware/errorData";

import { CookieSeter} from "../../utils/cookieSeter";
const Logout = async(req,res)=>{
    await  ConnectDB();
            CookieSeter(res,null,false)
            return ErrorData(res,200,"Logout Successfully");
        }

export default Logout