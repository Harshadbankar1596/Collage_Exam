import React, { useState } from "react";
import { useGetAllAdminsQuery } from "../../redux/Admin/AdminApi";

const Teachers = () => {
  const { data, isLoading } = useGetAllAdminsQuery();
  const [search, setSearch] = useState("");

  const filteredTeachers = data?.admins?.filter((t) => {
    const text = search.toLowerCase();
    return (
      t.Name.toLowerCase().includes(text) ||
      t.Email.toLowerCase().includes(text) ||
      t.Role.toLowerCase().includes(text) ||
      t.CollegeName.toLowerCase().includes(text)
    );
  });

  if (isLoading) {
  }

  return (
    <div className="w-full min-h-screen flex flex-col items-center p-4">
      {/* Search Bar */}
      <div className="w-full max-w-4xl mb-6">
        <input
          type="text"
          placeholder="Search teachers by name, email, role, college..."
          className="w-full p-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="w-full max-w-5xl bg-white border rounded-xl shadow overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Email</th>
              <th className="p-3 border">College</th>
              <th className="p-3 border">Role</th>
            </tr>
          </thead>

          <tbody>
            {filteredTeachers?.length > 0 ? (
              filteredTeachers.map((teacher) => (
                <tr
                  key={teacher._id}
                  className="hover:bg-gray-50 transition border-b"
                >
                  <td className="p-3 border font-semibold text-gray-800">
                    {teacher.Name}
                  </td>
                  <td className="p-3 border">{teacher.Email}</td>
                  <td className="p-3 border">{teacher.CollegeName}</td>
                  <td className="p-3 border text-blue-600 font-medium">
                    {teacher.Role}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="p-4 text-center text-gray-500 font-medium"
                >
                  No teachers found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Teachers;
