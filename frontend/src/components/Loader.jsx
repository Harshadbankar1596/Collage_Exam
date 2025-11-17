import React from 'react'
import Logo from './Logo'
const Loader = ({text}) => {
  return (
    <div className='flex w-full min-h-screen flex-col items-center justify-center '>
      <Logo size={50} color={"black"}/>
      <p>{text}</p>
    </div>
  )
}

export default Loader
