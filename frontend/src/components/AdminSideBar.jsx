import React from 'react'
import Logo from "./Logo"
import { Link } from "react-router-dom"
import { LayoutDashboard } from 'lucide-react';

const AdminSideBar = () => {

    const sides = [
        { name: "Dashboard", link: "/admin/", icon: <LayoutDashboard className="size-8" /> },
        // You can easily add more here later
        // { name: "Users", link: "/admin/users", icon: <Users className="size-8" /> },
        // { name: "Settings", link: "/admin/settings", icon: <Settings className="size-8" /> },
    ];

    return (
        <div className='bg-blue-900 h-screen w-1/4 flex flex-col'>
            {/* Logo Section */}
            <div className='flex items-center justify-center text-white font-bold text-3xl py-12'>
                <Logo size={50} />
                <p className='ml-2'>ptimized</p>
            </div>

            {/* Sidebar Links */}
            <div className='flex flex-col gap-2'>
                {sides.map((side, index) => (
                    <Link
                        key={index}
                        to={side.link}
                        className='text-white flex items-center gap-3 p-4 mx-3 rounded-lg hover:bg-blue-700 transition-all duration-300'
                    >
                        {side.icon}
                        <p className='text-xl'>{side.name}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default AdminSideBar;
