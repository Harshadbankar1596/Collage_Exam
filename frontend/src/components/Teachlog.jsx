import React from 'react'
import logo from'../logo.png'


function Teachlog() {
  return (
    <div  className='h-screen w-scree bg-slate-950'>
            
       
        <div className='h-[15vh] w-screen  opacity-100 flex items-center  '>
            <img className='h-[100px] w-[100px] animate-spin' src={logo} alt="bhbj" />
        <li >
            <ul className='text-white text-3xl pt-[16px] ml-[-20px] font-bold'>PTIMIZED</ul>
            <ul className='text-white text-xs opacity-75'>made by: Harshad & Kartik</ul></li>
        
        </div>
        <div className='border-4 border-purple-700 bg-purple-700 rounded-xl h-[60vh] w-[50vh] ml-[37%] mt-[2%] flex justify-center '>
          <form action="">
            <div>
              <h1 className='text-white text-bold text-4xl text-center pt-2'>Register</h1>
            </div>
            <div className='pt-10 flex justify-center  w-[50vh] h-[10vh]'>
              <input type="text" placeholder='username' required className='text-black w-[80%] rounded-xl pl-4 ' />
            </div>
            <div className='pt-10 flex justify-center  w-[50vh] h-[10vh]'>
              <input type="text" placeholder='gmail' required className='text-black w-[80%] rounded-xl pl-4' />
            </div>
            <div className='pt-10 flex justify-center   w-[50vh] h-[10vh]'>
              <input type="password" placeholder='password' required className='text-black w-[80%] rounded-xl pl-4' />
            </div>
            <div className='flex justify-center mt-[7vh] h-[6vh] '><button className='text-black rounded-xl bg-white w-[15vh]'>Register</button></div>
            <div className='flex gap-20 justify-center mt-[3vh]'><p className='text-white'>Already have an account</p>
            <button className='text-white underline'>login</button>
            </div>
          </form>
        </div>
        </div>
  )
}

export default Teachlog