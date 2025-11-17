import React from 'react';

const Logo = ({ size = 64, color }) => {
  return (
    <div className='rounded-full'>
      {color === "black" ? (
        <img
          className="logo-spin rounded-full cursor-pointer  drop-shadow-[0_0_10px_rgba(25,255,255,0.5)]"
          src="./blacklogo.jpg"
          alt="Logo"
          style={{
            width: `${size}px`,
            height: `${size}px`,
          }}
        />
      ) : <img
        className="logo-spin rounded-full cursor-pointer  drop-shadow-[0_0_10px_rgba(25,255,255,0.5)]"
        src="./logo.png"
        alt="Logo"
        style={{
          width: `${size}px`,
          height: `${size}px`,
        }}
      />}
    </div>
  );
};

export default Logo;
