import React from 'react'

const Logo = ({ size }) => {
    return (
        <div>
            <img
                className="w-16 animate-[spin_30s_linear_infinite] transition-transform duration-500 drop-shadow-[0_0_10px_rgba(25,255,255,0.5)]"
                src="./logo.png"
                alt="Logo"
                style={{
                    width: `${size}px`,
                    height: `${size}px`,
                }}
            />
        </div>
    )
}

export default Logo
