import React from 'react'
import "./header.scss"
import Link from 'next/link'
import { Logout } from '../Log/Logout'
const Header = () => {
   
  return (
    <>
    <header>
      <div>
      <h3 style={{color:"#4285F4",textShadow:" 2px 2px 4px #000000"}}>T</h3><h3 style={{color:"#DB4437",textShadow:" 2px 2px 4px #000000"}}>O</h3><h3 style={{color:"#F4B400",textShadow:" 2px 2px 4px #000000"}}>D</h3><h3 style={{color:"#4285F4",textShadow:" 2px 2px 4px #000000"}}>O</h3>
      </div>
        <article>
            <Link href={'/'}> <h3>Home</h3></Link>
            <Logout/>
        </article>
    </header>
    </>
  )
}

export default Header
