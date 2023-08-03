"use client";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState,useEffect } from 'react'
import ServerComp from './ServerComp';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Home = () => {
 const[title,setTitle] = useState<string>();
 const[desc,setDesc] = useState<string>();

  const [task,setTask] = useState<any>({});
  const router = useRouter();
const TaskData =async ()=>{
try {
  await axios.get('/api/myTask',{
    headers: {
      'Access-Control-Allow-Origin' : '*',
      'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      'content-type':'application/json; charset=utf-8'
    }
      }).then((res)=>{
        setTask(res.data.task);
        })
        .catch((err)=>{
          if(err.response.status===401){
            toast.warn("Lofin frist");
            router.push('/login')
          }
          console.log(err);
      })
} catch (error) {
  console.log(error)
}   
  }


  const SubmitHandler =async(e:any)=>{ 
    e.preventDefault();
    
    try {
        await axios.post('/api/usertask',{title,desc},{
        headers: {
          'Access-Control-Allow-Origin' : '*',
          'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
          'content-type':'application/json; charset=utf-8'
        }
          }).then((res)=>{
            toast.success("Task Created successfull");
            setDesc("");
            setTitle("");
            TaskData();
          }).catch((err)=>{
            if(err.response.status===400){
              toast.warn(err.response.data.message);
            }else if(err.response.status===401){
              toast.warn(err.response.data.message);
              router.push('/login')
            }
            // console.log(err);
          })
      
      
    } catch (error) {
      // console.log(error);
    }
  }
  useEffect(()=>{
    TaskData();
  },[])
  return (
    <>
    <div className="login_con">
    <div className='todo'>
      <form>
        <input value={title} style={{fontSize:'20px'}} type="text" onChange={(e)=>setTitle(e.target.value)} name="title" placeholder='Enter your Task title' id="" />
        <textarea value={desc} name="desc" onChange={(e)=>setDesc(e.target.value)} placeholder='Description' id="" ></textarea>
        <button onClick={SubmitHandler}>Add Task</button>
      </form>
    </div>
    <section className='task_container'>
      {
         Object.values(task).map((item:any,index:number)=>(
          <ServerComp TaskData={TaskData} key={index} title={item.title} desc={item.desc} id={item._id}/>
        ))
      }
   </section>
    </div>
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

export default Home
