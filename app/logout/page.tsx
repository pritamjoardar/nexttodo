"use client"
import React, { useEffect } from 'react'
import axios from 'axios'
import Spiner from '../components/spiner/spiner';
import { useContext } from 'react';
import { useRouter } from 'next/navigation';
import { Context } from '../components/Log/Logout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Page = () => {
  const router = useRouter();
  const {user,setUser} = useContext<any>(Context);

  const Logout = async()=>{
    try {
      await axios.post('/api/logout',{
      headers: {
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        'content-type':'application/json; charset=utf-8'
      }
        }).then((res)=>{
          toast(res.data.message)  ;
          setUser("")
          router.push("/login")
          })
          .catch((err)=>{
            console.log(err)
        })
    
    
  } catch (error) {
    console.log(error);
  }
  }
  useEffect(()=>{
    Logout();
  },[])
  return (
    <>
    <div >Logout.......</div>
    <div style={{marginTop:"3rem",display:"flex",alignItems:"center"}}>
    Logout.......<Spiner/>
</div>
    </>
  )
}

export default Page
