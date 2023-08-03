"use client";
import Link from 'next/link'
import { createContext,useState,useContext ,useEffect} from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const Context = createContext<any>({user:{}})
 const ContextProvider = ({children}:any)=>{
  const router = useRouter();
    const [user,setUser] = useState();
    useEffect(()=>{
      const GetData = async()=>{
        await axios.get('/api/meprofile',{
          headers: {
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            'content-type':'application/json; charset=utf-8'
          }
            }).then((res)=>{
              if(res.status===200){
              setUser(res.data);
              }
              })
              .catch((err)=>{
                if(err.response.status===401){
                  toast.warn("You have to login frist")
                  router.push('/login');
                }
            })
        
      }
       GetData();
    },[])
    return <Context.Provider value={{user,setUser}}> 
        {children}
    </Context.Provider>
}
const Signup=()=>{
  return(
<>
    <Link href={'/signup'}> <h3>Signup</h3></Link>
    <Link href={'/login'}> <h3>Login</h3></Link>
</>
  )
}


export const Logout = () => {
  const About=()=>{
    return(
  <>
      <Link href={'/about'}> <h3>About</h3></Link>
      <Link href={'/logout'}> <h3>Logout</h3></Link>
  </>
    )
  }
    const router = useRouter()
    const {user,setUser} = useContext<any>(Context);

    
  return (
    <>
    {user?<About/>: <Signup/>
    }
     
    </>
  )
}

export default ContextProvider