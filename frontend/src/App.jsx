import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

// Components
import AdminSideBar from "./components/AdminSideBar.jsx";
// Admin
import AdminRegister from "./components/AdminRegister.jsx";
import AdminLogin from "./components/AdminLogin.jsx";
import CreateExam from "./Admin/pages/CreateExam.jsx";
import AllExams from "./Admin/pages/AllExams.jsx";
import AdminProtected from "./components/AdminProtected.jsx";
import SubmittedExam from "./Admin/pages/Exams/SubmittedExam.jsx";
import Students from "./Admin/pages/Students.jsx";

const App = () => {
  const location = useLocation();

  // Hide sidebar on login/register pages
  const hideSidebar =
    location.pathname.includes("login") || location.pathname.includes("register");

  return (
    <div className=" min-h-screen flex bg-gray-50">
      {!hideSidebar && <AdminSideBar />}

      <div
        className={`flex-1 min-h-screen transition-all duration-300 ${!hideSidebar ? "md:ml-72" : ""
          } flex items-center justify-center`}
      >
        <div className="w-full mx-auto flex px-5 py-5">
          <Routes>

            <Route path="/admin/register" element={<AdminRegister />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/create-exam" element={
              <AdminProtected Element={<CreateExam />} />
            } />
            <Route path="/admin/exams" element={<AdminProtected Element={<AllExams />} />} />
            <Route path="/admin/submited-exam/:ExamId" element={<AdminProtected Element={<SubmittedExam />} />} />
            <Route path="/admin/students" element={<AdminProtected Element={<Students />} />} />

          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App