import React from "react";
import { BrowserRouter, Routes, Route , useParams , useLocation} from "react-router-dom";


// components
import AdminSideBar from "./components/AdminSideBar.jsx";
// Admin
import AdminRegister from "./components/AdminRegister.jsx";
import AdminLogin from "./components/AdminLogin.jsx"
const App = () => {
  const params = useLocation();
  return (
    <div className="flex bg-gradient-to-br from-[#e8f0ff] via-[#f4f7ff] to-[#e8f0ff]">
      
      
        {params.pathname.includes("login" || "register") && <AdminSideBar />}
      

      <div className="w-full">
        <Routes>
          {/*  Admin Routes */}
          <Route path="/admin">
            <Route path="register" element={<AdminRegister />} />
            <Route path="login" element={<AdminLogin />} />
          </Route>

          {/*  User Routes */}
          <Route path="/user">
            <Route path="login" element={<AdminRegister />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
};

export default App;
