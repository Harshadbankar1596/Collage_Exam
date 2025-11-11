// import React from 'react'

// const Logo = ({ size }) => {
//     return (
//         <div>
//             <img
//                 className="w-16 rounded-full cursor-pointer animate-[spin_30s_linear_infinite] hover:animate-[spin_1s_linear_infinite] transition duration-1000 drop-shadow-[0_0_10px_rgba(25,255,255,0.5)]"
//                 src="./logo.png"
//                 alt="Logo"
//                 style={{
//                     width: `${size}px`,
//                     height: `${size}px`,
//                 }}
//             />
//         </div>
//     )
// }

// export default Logo


import React from 'react';

const Logo = ({ size = 64 }) => {
  return (
    <div>
      <img
        className="logo-spin rounded-full cursor-pointer drop-shadow-[0_0_10px_rgba(25,255,255,0.5)]"
        src="./logo.png"
        alt="Logo"
        style={{
          width: `${size}px`,
          height: `${size}px`,
        }}
      />
    </div>
  );
};

export default Logo;
