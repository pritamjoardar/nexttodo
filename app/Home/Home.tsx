"use client";
import axios from 'axios';
import {MdDelete} from "react-icons/md"
import {RiEdit2Fill} from "react-icons/ri"
import { useRouter } from 'next/navigation';
import React, { useState,useEffect, Suspense } from 'react'
import { ToastContainer, toast, useToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spiner from '../components/spiner/spiner';
const Home = () => {
  const [load,setLoad] = useState<boolean>(false);
  const [delload,setDelload] = useState<boolean>(false);
  const [fetchTask,setfetchTask] = useState<boolean>(false);
  const [update,setUpdate] = useState<boolean>(false);
  const[ID,setID] = useState<any>();
  const[updating,setUpating] = useState<boolean>(false);
  const [taskno,setTaskno] = useState<number>(0);


 const[title,setTitle] = useState<string>();
 const[desc,setDesc] = useState<string>();

  const [task,setTask] = useState<any>({});
  const router = useRouter();
  //for task
  const TaskData =async ()=>{
    try {
      setfetchTask(true);
      await axios.get('/api/myTask',{
        headers: {
          'Access-Control-Allow-Origin' : '*',
          'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
          'content-type':'application/json; charset=utf-8'
        }
          }).then((res)=>{
            if(res.status===200){
              setTaskno(res.data.task.length)
              setTask(res.data.task);
              setfetchTask(false);
            }
            
            })
            .catch((err)=>{
              if(err.response.status===401){
                toast.warn("You have to Login frist");
                router.push('/login')
              }
              // console.log(err);
          })
    } catch (error) {
      console.log(error)
    }   
      }



  const Delete = ({id,desc,title}:any) => {
 //for update
 const TaskUpdate = async(e:any)=>{
  setID(id);
  setTitle(title);
  setDesc(desc);
  setUpdate(true);
}

//for delete
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
          setDelload(true)
          await axios.delete(`/api/task/${id}`,{
          headers: {
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            'content-type':'application/json; charset=utf-8'
          }
            }).then(async(res)=>{
              if(res.status===200){
              TaskData();
              TaskData();
              setDelload(false);
              if(!delload){
              toast.success(`${res.data.message}(${id})`);
              }
            }
              
            }).catch((err)=>{
              toast.error("Internal server error")
              setDelload(false);
            })      
      } catch (error) {
        console.log(error);
        setDelload(false);
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

  const ServerComp = ({title,desc,id}:any) => {
    return (
      <>
      <div className="servercon">
      <div className="con">
        <div className='details'>
          <h2 style={{color:"#238636",fontSize:"1.8rem",fontWeight:"bold"}}>{title}</h2>
          <p style={{color:"black"}}>{desc}</p>
        </div>
          <Delete id={id} desc={desc} title={title}/>
      </div>
      </div>
      
      </>
    )
  }
  //update handler
  const UpdateHandler =async(e:any)=>{
    e.preventDefault();
    try {
      setUpating(true);
      await axios.put(`/api/task/${ID}`,{title,desc},{
        headers: {
          'Access-Control-Allow-Origin' : '*',
          'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
          'content-type':'application/json; charset=utf-8'
        }
          }).then((res)=>{
            setTitle("");
            setDesc("");
            if(res.status===200){
              setTitle("");
              setDesc("");
              toast.success(res.data.success);
              setUpating(false);
              setUpdate(false);
            }
            TaskData();
          }).catch((err)=>{
            if(err.response.status===400){
              toast.warn(err.response.data.message);
              // setUpdate(false)
            }else if(err.response.status===401){
              toast.warn(err.response.data.message);
              setUpdate(false);
            }
            console.log(err);
          })
    } catch (error) {
      console.log(error);
      setUpdate(false)

    }
   
  }
//for add button
  const SubmitHandler =async(e:any)=>{ 
    e.preventDefault();    
    try {
      setLoad(true)
        await axios.post('/api/usertask',{title,desc},{
        headers: {
          'Access-Control-Allow-Origin' : '*',
          'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
          'content-type':'application/json; charset=utf-8'
        }
          }).then((res)=>{
            if(res.status===200){
              toast.success("Task Created successfull");
              setDesc("");
              setTitle("");
              setLoad(false)
              TaskData();
            }           
          }).catch((err)=>{
            if(err.response.status===400){
              toast.warn(err.response.data.message);
            setLoad(false)
            }else if(err.response.status===401){
              toast.warn(err.response.data.message);
            setLoad(false)
              router.push('/login')
            }else if(err.response.status===500){
              toast.warn("You have to login frist");
            setLoad(false)
              router.push('/login')
            }
            
          });      
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    TaskData();
  },[]);
  return (
    <>
    <div className="login_con" style={{height:"100%"}}>
    <div className='todo' style={{marginTop:"4rem"}}>
      <form>
        <input value={title} style={{fontSize:'2rem'}} type="text" onChange={(e)=>setTitle(e.target.value)} name="title" placeholder='Enter your Task title' id="" />
        <textarea value={desc} name="desc" onChange={(e)=>setDesc(e.target.value)} placeholder='Description' id="" ></textarea>
        <button onClick={update?UpdateHandler:SubmitHandler}>{load?"Adding...":update?"Update Data":"Add Task"}</button>
      </form>
    </div>   
    <section style={{display:"flex"}}>
    <h4>Total no of task:</h4><span style={{color:"#238636"}}>{taskno}</span>
    </section>
    
    <p>{delload || fetchTask || updating?<Spiner/>:""}</p>
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
