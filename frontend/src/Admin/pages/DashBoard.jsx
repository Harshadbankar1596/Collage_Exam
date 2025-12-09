import React from "react";
import { useGetDashboardStatsQuery } from "../../redux/Admin/AdminApi";
import { useSelector } from "react-redux";
import {
  ClipboardList,
  BookOpenCheck,
  UsersRound,
  ShieldUser,
  LayoutDashboard,
  LogOut,
} from "lucide-react";
import { Link } from "react-router-dom";

const DashBoard = () => {
  const admin = useSelector((state) => state.admin);
  const { data } = useGetDashboardStatsQuery(admin.id);

  return (
    <div className="min-h-screen w-full p-6">
      <nav className="bg-white shadow-md rounded-xl p-5 flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-blue-600 flex items-center gap-2">
          <LayoutDashboard size={26} />
          Admin Dashboard
        </h1>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="font-semibold text-gray-800">{data?.admin?.Name}</p>
            <p className="text-sm text-gray-500">{data?.admin?.Email}</p>
          </div>

          <Link
            to={"/admin/login"}
            className="bg-red-500 hover:bg-red-600 p-2 rounded-lg text-white flex items-center gap-2"
          >
            <LogOut size={18} />
            Logout
          </Link>
        </div>
      </nav>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link
          to="/admin/exams"
          className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition flex items-center gap-4 cursor-pointer"
        >
          <ClipboardList className="text-blue-600" size={40} />
          <div>
            <p className="text-sm text-gray-500">Exams Conducted</p>
            <h2 className="text-2xl font-bold">
              {data?.admin?.ConductedExams?.length}
            </h2>
          </div>
        </Link>

        <Link
          to="/admin/exams"
          className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition flex items-center gap-4 cursor-pointer"
        >
          <BookOpenCheck className="text-green-600" size={40} />
          <div>
            <p className="text-sm text-gray-500">Total Exams Created</p>
            <h2 className="text-2xl font-bold">{data?.examCount}</h2>
          </div>
        </Link>

        <Link
          to="/admin/exams"
          className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition flex items-center gap-4 cursor-pointer"
        >
          <ShieldUser className="text-purple-600" size={40} />
          <div>
            <p className="text-sm text-gray-500">Total Submitted Exams</p>
            <h2 className="text-2xl font-bold">{data?.submitExamCount}</h2>
          </div>
        </Link>

        <Link
          to="/admin/students"
          className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition flex items-center gap-4 cursor-pointer"
        >
          <UsersRound className="text-orange-600" size={40} />
          <div>
            <p className="text-sm text-gray-500">Total Students</p>
            <h2 className="text-2xl font-bold">{data?.studentCount || 0}</h2>
          </div>
        </Link>

        <Link
          to="/admin/teachers"
          className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition flex items-center gap-4 cursor-pointer"
        >
          <ShieldUser className="text-indigo-600" size={40} />
          <div>
            <p className="text-sm text-gray-500">Total Teachers</p>
            <h2 className="text-2xl font-bold">{data?.teacherCount || 0}</h2>
          </div>
        </Link>
      </div>

      {/* ADMIN DETAILS */}
      <div className="mt-12 bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Admin Details
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Detail label="Name" value={data?.admin?.Name} />
          <Detail label="Email" value={data?.admin?.Email} />
          <Detail label="Phone" value={data?.admin?.Phone} />
          <Detail label="Role" value={data?.admin?.Role} />
          <Detail label="College" value={data?.admin?.CollegeName} />
        </div>
      </div>
    </div>
  );
};

/* SMALL COMPONENT TO REDUCE REPEATED CODE */
const Detail = ({ label, value }) => (
  <div>
    <p className="text-sm text-gray-500">{label}</p>
    <p className="font-semibold text-gray-800">{value}</p>
  </div>
);

export default DashBoard;
