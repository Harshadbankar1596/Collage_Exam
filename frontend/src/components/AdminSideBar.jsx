import React, { useState } from "react";
import Logo from "./Logo";
import Name from "./Name";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutAdminMutation } from "../redux/Admin/AdminApi";
import {
  LayoutDashboard,
  LogOut,
  BookOpenCheck,
  BookLock,
  UsersRound,
  ShieldUser,
  Menu,
  X,
} from "lucide-react";
import { logoutAdmin } from "../redux/Admin/AdminSlice.js";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const AdminSideBar = () => {
  const [open, setOpen] = useState(false);
  const [logout, { isLoading }] = useLogoutAdminMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sides = [
    { name: "Dashboard", link: "/admin/", icon: <LayoutDashboard className="size-6 md:size-8" /> },
    { name: "Exams", link: "/admin/exams", icon: <BookOpenCheck className="size-6 md:size-8" /> },
    { name: "Create Exam", link: "/admin/create-exam", icon: <BookLock className="size-6 md:size-8" /> },
    { name: "Students", link: "/admin/students", icon: <UsersRound className="size-6 md:size-8" /> },
    { name: "Teachers Staff", link: "/admin/teachers", icon: <ShieldUser className="size-6 md:size-8" /> },
  ];

  async function logoutadmin() {
    try {
      await logout().unwrap();
      toast.success("Logout Successful!");
      dispatch(logoutAdmin());
      navigate("/admin/login");
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || "Error In Logout");
    }
  }

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white shadow-lg rounded-full text-blue-900 hover:bg-blue-100 transition-all"
      >
        {open ? <X size={26} /> : <Menu size={26} />}
      </button>

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0
          h-full w-72
          bg-blue-900 text-white
          flex flex-col justify-between
          z-40
          transform md:translate-x-0
          transition-transform duration-300 ease-in-out
          overflow-y-auto
          ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Logo Section */}
        <div className="flex gap-2 items-center justify-center py-10 border-b border-white/10">
          <Logo size={40} />
          <Name size={24} />
        </div>

        {/* Sidebar Links */}
        <div className="flex flex-col gap-2 mt-4 px-2">
          {sides.map((side, index) => (
            <Link
              key={index}
              to={side.link}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 p-3 mx-2 rounded-lg hover:bg-yellow-500 transition-all duration-300"
            >
              {side.icon}
              <p className="text-lg">{side.name}</p>
            </Link>
          ))}
        </div>

        {/* Logout Button */}
        <div className="py-6 flex items-center w-full border-t border-white/10">
          <button
            onClick={logoutadmin}
            className="text-white flex items-center w-full gap-3 p-3 mx-3 rounded-lg hover:bg-red-500 transition-all duration-300"
          >
            <LogOut className="size-6 md:size-8" />
            <p className={`text-lg ${isLoading ? "cursor-not-allowed" : "cursor-pointer"}`}>
              {isLoading ? "Loading..." : "Logout"}
            </p>
          </button>
        </div>
      </div>

      {/* Overlay (Mobile Only) */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm md:hidden z-30"
          onClick={() => setOpen(false)}
        ></div>
      )}
    </>
  );
};

export default AdminSideBar;
