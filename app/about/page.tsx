"use client";
import axios from "axios";
import { useEffect, useState } from "react";
const Page = () => {
  const[Data,setData] = useState<any>({});
  const [load,setLoad] = useState<boolean>();
  useEffect(()=>{
    const GetData = async()=>{
      setLoad(true);
      await axios.get('/api/meprofile',{
        headers: {
          'Access-Control-Allow-Origin' : '*',
          'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
          'content-type':'application/json; charset=utf-8'
        }
          }).then((res)=>{
            if(res.status===200){
              setData(res.data.user);
              setLoad(false)
            }
            })
            .catch((err)=>{
              if(err.response.status===401){
              setLoad(false)
              }
          })
      
    }
     GetData();
  },[])
  return (
    <>
    <div className="profile">
    <div className="profile_con">
      <img src="https://cdn-icons-png.flaticon.com/128/2202/2202112.png" alt="" />
      <div className="details">
      <h4>ID :{load?"Loading...":Data._id}</h4>
      <h4>Name :{load?"Loading...":Data.name}</h4>
      <h4>Email :{load?"Loading...":Data.email}</h4>
      <h4>Number :{load?"Loading...":Data.number}</h4>
      </div>
    </div>
    </div>
    </>
  )
}

export default Page
