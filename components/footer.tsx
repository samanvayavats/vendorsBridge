import React from 'react'
import { FaHeart } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

const footer = () => {
  return (
    <div className='h-20 bg-black text-white mt-8 flex justify-center flex-col items-center'>
      <div className=' flex items-center gap-2'>Made by Samanvaya with < FaHeart size={20}/></div>
      <div>samanvayavats@gmail.com</div>
      <div className=' flex items-center gap-2'><FaLinkedin /> <FaGithub /></div>
    </div>
  )
}

export default footer
