"use client";
import axios from "axios";
import { useEffect, useState } from "react";
const Page = () => {
  const[Data,setData] = useState<any>({});
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
              setData(res.data.user);
            }
            })
            .catch((err)=>{
              if(err.response.status===401){
               
              }
          })
      
    }
     GetData();
  },[])
  return (
    <div>
      <h4>ID :{Data._id}</h4>
      <h4>Name :{Data.name}</h4>
      <h4>Email :{Data.email}</h4>
      <h4>Number :{Data.number}</h4>
    </div>
  )
}

export default Page
