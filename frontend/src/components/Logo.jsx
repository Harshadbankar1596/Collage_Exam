import React from "react";

const Logo = ({ size = 64 }) => {
  return (
    <img
      src="/tcc.png"
      alt="Logo"
      // style={{ width: size, height: size }}
      className="cursor-pointer select-none"
    />
  );
};

export default Logo;
