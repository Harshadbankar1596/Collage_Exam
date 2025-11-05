import React from "react";
import logo from "../logo.png";

function Navbar({ onSelect }) {
  return (
    <div className="h-screen w-screen bg-slate-950 flex flex-col items-center justify-center">
      
      {/* Header Section */}
      <div className="flex items-center gap-3 mb-10">
        <img
          className="h-[100px] w-[100px] animate-spin-slow"
          src={logo}
          alt="Optimized Logo"
        />
        <div>
          <h1 className="text-white text-3xl font-bold tracking-wider">
            PTIMIZE
          </h1>
          <p className="text-white text-xs opacity-75">
            made by: Harshad & Kartik
          </p>
        </div>
      </div>

      {/* Welcome Text */}
      <h1 className="text-white text-4xl hover:text-blue-500 text-center mb-12 transition-colors duration-300">
        Welcome
      </h1>

      {/* Buttons */}
      <div className="flex flex-wrap justify-center gap-6">
        <button
          onClick={() => onSelect("A")}
          className="text-white font-bold bg-purple-700 px-8 py-3 rounded-xl hover:scale-110 transition-transform duration-300"
        >
          Register as Teacher
        </button>

        <button
          onClick={() => onSelect("B")}
          className="text-white font-bold bg-purple-700 px-8 py-3 rounded-xl hover:scale-110 transition-transform duration-300"
        >
          Register as Student
        </button>
      </div>
    </div>
  );
}

export default Navbar;
