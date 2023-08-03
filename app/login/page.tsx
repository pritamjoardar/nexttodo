"use client";
import React ,{useContext, useState}from 'react'
import Link from 'next/link';
import axios from 'axios'
import { redirect } from 'next/navigation'
import { Context } from '../components/Log/Logout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Page = () => {

  const {user,setUser} = useContext<any>(Context);
  const [data,setData] = useState<any>({});
  const InputHandler =(e:any)=>{
    let name:string = e.target.name;
    let value:string = e.target.value;
      setData({...data,[name]:value});
  }
  const SubmitHandler =async(e:any)=>{ 
    e.preventDefault();
    try {
      const {email,password} = data ;
        await axios.post('/api/login',{email,password},{
        headers: {
          'Access-Control-Allow-Origin' : '*',
          'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
          'content-type':'application/json; charset=utf-8'
        }
          }).then((res)=>{
            if(res.status===200){
              setUser(res.data.UserData); 
              toast.success(res.data.message)
            }
                  
            })
            .catch((err)=>{
              if(err.response.status===400){
                toast.error(err.response.data.message);
              }
          })
      
      
    } catch (error) {
      console.log(error);
    }
  }
  
  if(user){
    redirect('/')
  }
  return (
    <>
    <form>
    <div className="login_con">
        <div className='login'>
            <h2>Login Page</h2>
            <input onChange={InputHandler} placeholder='Enter your Email' type="email" name="email" id="" />
            <input onChange={InputHandler} placeholder='Enter your password' type="password" name="password" />
            <button onClick={SubmitHandler}>Login</button>
            <p>or</p>
            <Link href="./signup">Signup</Link>
        </div>
    </div>
    </form>
    <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
    </>
  )
}

export default Page
