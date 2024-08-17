import React from 'react'
import Menu from './Menu'
import MainBody from './MainBody'
import Bell from '../assets/bell_int.png'
import ProfilePic from '../assets/Ellipse 211.png'
function Navbar() {
  return (
    <div className='h-20 bg-primary flex justify-between p-5 items-center border-b border-border-500'>
      <div className='text-secondary font-bold text-[38px] justify-center'>PEOPLE.CO</div>
      <div className='flex gap-2 items-center'>
        <img className='h-9 w-9' src={Bell} alt='bell'></img>
        <div className='flex items-center gap-2'>
        <img className='h-9 w-9' src={ProfilePic} alt='pfp'></img>
        <p className='text-[16px]'>Jane Doe</p>
        </div>
      </div>
    </div>
  
  )
}

export default Navbar