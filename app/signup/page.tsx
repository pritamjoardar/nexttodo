"use client";
import Link from 'next/link'
import React, { useState,useContext, useEffect } from 'react'
import axios from 'axios';
import { Context } from '../components/Log/Logout';
import { useRouter } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Page = () => {
  const {user,setUser} = useContext<any>(Context);
  const router = useRouter();
  const [data,setData] = useState<any>({});
  const InputHandler =(e:any)=>{
    let name = e.target.name;
    let value = e.target.value;
      setData({...data,[name]:value});
  }
  const SubmitHandler =async(e:any)=>{ 
    e.preventDefault();
    try {
      const {name,email,number,password,cpassword} = data ;
      if(!name || !email || !number || !password || !cpassword){
        toast.warn("Fill the Data");
      }
      else if(password!=cpassword){
        toast.warn("Password and Cpassword doesn't match");
      }
      else if(password.length<6 || cpassword.length <6){
        toast.warn("Password and cpassword must be grather then 6 character")
      }else{
        await axios.post('/api/Register',{name,email,number,password},{
        headers: {
          'Access-Control-Allow-Origin' : '*',
          'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
          'content-type':'application/json; charset=utf-8'
        }
          }).then(async(res)=>{
            if(res.status===200){
              toast.success(res.data.message);
              setUser(res.data.Data)
              Refresh()
            }
          })
            .catch((err)=>{
              if(err.response.status===403){
                toast.error(err.response.data.message)
              }
          })
      }
      
    } catch (error) {
      console.log(error);
    }
  }
  const Refresh = ()=>{
      router.push("/");
  }
  useEffect(()=>{
    if(user){
      router.push("/");
    }
  },[])
  return (
    <>
    <form action={'post'}>
     <div className="login_con">
        <div className='login'>
            <h2>Sign Up</h2>
            <input onChange={InputHandler} placeholder='Enter your Name' type="text" name="name"  />
            <input onChange={InputHandler} placeholder='Enter your email' type="email" name="email"  />
            <input onChange={InputHandler} placeholder='Phone number' type="number" name="number"  />
            <input onChange={InputHandler} placeholder='Enter your password' type="password" name="password"  />
            <input onChange={InputHandler} placeholder='Enter your cpassword' type="password" name="cpassword" />
            <button onClick={SubmitHandler}>Sign Up</button>
            <p>or</p>
            
            <Link href={'/login'}>Login</Link>
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
