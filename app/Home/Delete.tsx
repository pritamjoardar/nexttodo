"use client";
import axios from 'axios';
import React from 'react'
import {MdDelete} from "react-icons/md"
import {RiEdit2Fill} from "react-icons/ri"
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Delete = ({id,TaskData}:any) => {
  const router = useRouter();
const TaskUpdate = async(e:any)=>{
  e.preventDefault();
 toast("This func under dev....")
}
  const TaskDelete =async (e:any)=>{
    e.preventDefault();
    if(!id){
      return "Id not found"
    }else{
      const Res = confirm("Are you sure you want to delete this")
      if(!Res){
        return null
      }else{
    try {
        await axios.delete(`/api/task/${id}`,{
        headers: {
          'Access-Control-Allow-Origin' : '*',
          'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
          'content-type':'application/json; charset=utf-8'
        }
          }).then((res)=>{
            if(res.status===200){
            toast.success(res.data.message)
            TaskData();
            router.refresh();
            }
            
          }).catch((err)=>{
            toast.error("Internal server error")
          })      
    } catch (error) {
      console.log(error);
    }}
  }}
  return (
    <>
    <div className='icon'>
    <div onClick={TaskDelete}><MdDelete/></div>
    <div onClick={TaskUpdate}><RiEdit2Fill/></div>
    </div>

   </> 
  )
}

export default Delete
