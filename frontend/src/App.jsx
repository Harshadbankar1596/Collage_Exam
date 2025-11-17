import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

// Components
import AdminSideBar from "./components/AdminSideBar.jsx";
// Admin
import AdminRegister from "./components/AdminRegister.jsx";
import AdminLogin from "./components/AdminLogin.jsx";
import CreateExam from "./Admin/pages/CreateExam.jsx";
import AllExams from "./Admin/pages/AllExams.jsx";

const App = () => {
  const location = useLocation();

  // Hide sidebar on login/register pages
  const hideSidebar =
    location.pathname.includes("login") || location.pathname.includes("register");

  return (
    <div className="bg-gradient-to-br from-[#e8f0ff] via-[#f4f7ff] to-[#e8f0ff] min-h-screen flex">
      {!hideSidebar && <AdminSideBar />}

      <div
        className={`flex-1 min-h-screen transition-all duration-300 ${!hideSidebar ? "md:ml-72" : ""
          } flex items-center justify-center`}
      >
        <div className="w-f mx-auto flex px-5 py-5">
          <Routes>

            <Route path="/admin/register" element={<AdminRegister />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/create-exam" element={<CreateExam />} />
            <Route path="/admin/exams" element={<AllExams />} />

          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App