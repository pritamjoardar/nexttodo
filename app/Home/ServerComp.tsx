import React from 'react'
import Delete from "./Delete"
const ServerComp = ({title,desc,id,TaskData}:any) => {
  return (
    <>
    <div className="servercon">
    <div className="con">
      <div className='details'>
        <h4>{title}</h4>
        <p>{desc}</p>
      </div>
        <Delete TaskData={TaskData} id={id}/>
    </div>
    </div>
    
    </>
  )
}

export default ServerComp
