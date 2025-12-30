import React, { useState } from "react";
import { useGetAllUsersQuery } from "../../redux/Admin/AdminApi";

const Students = () => {
  const { data } = useGetAllUsersQuery();
  const [search, setSearch] = useState("");

  const filteredStudents = data?.students?.filter((std) => {
    const text = search.toLowerCase();

    return (
      (std?.Name || "").toLowerCase().includes(text) ||
      (std?.Email || "").toLowerCase().includes(text) ||
      String(std?.RollNo || "").toLowerCase().includes(text) ||
      String(std?.PRN || "").toLowerCase().includes(text) ||
      String(std?.Phone || "").toLowerCase().includes(text)
    );
  });

  return (
    <div className="w-full min-h-screen flex flex-col items-center p-4">
      
      {/* Search */}
      <div className="w-full max-w-4xl mb-6">
        <input
          type="text"
          placeholder="Search by name, email, phone, roll no, PRN..."
          className="w-full p-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="w-full max-w-6xl bg-white border rounded-xl shadow overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Email</th>
              <th className="p-3 border">Phone</th>
            </tr>
          </thead>

          <tbody>
            {filteredStudents?.length > 0 ? (
              filteredStudents.map((std) => (
                <tr
                  key={std._id}
                  className="hover:bg-gray-50 transition"
                >
                  <td className="p-3 border font-semibold text-gray-800">
                    {std.Name}
                  </td>
                  <td className="p-3 border">{std.Email}</td>
                  <td className="p-3 border">{std.Phone || "-"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={3}
                  className="p-4 text-center text-gray-500 font-medium"
                >
                  No students found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Students;
