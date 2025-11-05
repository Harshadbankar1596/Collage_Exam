import React from 'react'
import logo from'../logo.png'
function Adminpanel() {
    
  return (
    <div  className='h-screen w-scree bg-slate-950'>
                    
               
                <div className='h-[15vh] w-screen  opacity-100 flex items-center  '>
                    <img className='h-[100px] w-[100px] animate-spin-slow' src={logo} alt="bhbj" />
                <li >
                    <ul className='text-white text-3xl pt-[16px] ml-[-20px] font-bold'>PTIMIZED</ul>
                    <ul className='text-white text-xs opacity-75'>made by: Harshad & Kartik</ul></li>
                
                </div>
                <div className='h-[73vh] w-[40vh] bg-blue-800 text-black border-r border-white mt-10'>
                    <h1 className=' text-bold mt-20 text-center '>Class</h1>
                    <h1 className=' text-bold mt-20 text-center'>username</h1>
                    <h1 className=' text-bold mt-20 text-center '>Exams</h1>
                    <h1 className=' text-bold mt-20 text-center '>Exams history</h1>
                    <h1 className=' text-bold mt-20 text-center '>Chats</h1>
                </div>
                </div>
                
                
  )
}

export default Adminpanel