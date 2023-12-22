import React from 'react'
import "./Navbar.css";
export default function Navbar() {
  return (
    <>
      <div id='navbar' onClick={()=>{
        window.location.href="/"
      }}>
        <img src="gallery.png" alt='Portfolio-Home' width={"50px"} height={"50px"}/>
        <h3>PhotoFolio</h3>
      </div>
    </>
  )
}
