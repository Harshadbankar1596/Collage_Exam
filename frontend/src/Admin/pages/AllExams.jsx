import React, { useState } from "react";
import {
  useGetAllExamQuery,
  useDeleteExamMutation,
} from "../../redux/Admin/AdminApi";
import { useSelector } from "react-redux";
import Loader from "../../components/Loader";
import {
  Edit3,
  Trash2,
  Eye,
  Calendar,
  Users,
  BookOpen,
  AlertTriangle,
  X,
} from "lucide-react";
import ExamDetail from "./Exams/ExamDetail";
import { toast } from "react-toastify";
import UpdateExamModel from "./UpdateExamModel";
import { Link } from "react-router-dom";

const AllExams = () => {
  const admin = useSelector((state) => state.admin);
  const [deleteLoading, setDeleteLoading] = useState(null);
  const [selectedExam, setSelectedExam] = useState(null);
  const [ExamData, setExamdata] = useState("");

  const [confirmDelete, setConfirmDelete] = useState(null);

  const [deleteExam] = useDeleteExamMutation();

  const { data: exams, isLoading } = useGetAllExamQuery({
    id: admin.id,
    page: 1,
    limit: 10,
  });

  const handleDeleteExam = async () => {
    if (!confirmDelete) return;

    setDeleteLoading(confirmDelete);
    try {
      const res = await deleteExam({
        AdminId: admin.id,
        ExamId: confirmDelete,
      }).unwrap();
      toast.success(res.message || "Exam Deleted");
      setConfirmDelete(null); // close modal
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || "Error In Delete Exam");
    } finally {
      setDeleteLoading(null);
    }
  };

  if (isLoading) return <Loader text={"Loading Exams..."} />;

  return (
    <div className="w-full">
      {/* ================= CONFIRM DELETE MODAL (Lucide React) ================= */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-2xl w-80 relative">
            {/* Close Button */}
            <button
              onClick={() => setConfirmDelete(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>

            {/* Icon */}
            <div className="flex justify-center mb-3">
              <AlertTriangle size={40} className="text-red-500" />
            </div>

            <h2 className="text-lg font-semibold text-gray-800 text-center">
              Confirm Delete
            </h2>

            <p className="text-gray-600 text-sm text-center mt-2">
              Are you sure you want to delete this exam? This action cannot be
              undone.
            </p>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setConfirmDelete(null)}
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm font-medium"
              >
                Cancel
              </button>

              <button
                onClick={handleDeleteExam}
                disabled={deleteLoading === confirmDelete}
                className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm font-medium flex items-center"
              >
                {deleteLoading === confirmDelete ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                ) : (
                  <Trash2 size={16} className="mr-2" />
                )}
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedExam && (
        <ExamDetail exam={selectedExam} onClose={() => setSelectedExam(null)} />
      )}

      <div className="mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-blue-800 mb-3">All Exams</h1>
          <p className="text-gray-600 text-lg">
            Manage and monitor your examinations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex items-center">
              <BookOpen className="text-blue-500 mr-4" size={32} />
              <div>
                <p className="text-sm text-gray-500">Total Exams</p>
                <p className="text-2xl font-bold text-gray-800">
                  {exams?.exams?.length || 0}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {[...(exams?.exams || [])].reverse().map((exam) => (
            <Link
              to={`/admin/submited-exam/${exam._id}`}
              key={exam._id}
              className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 text-white">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-sm font-semibold bg-white/20 px-2 py-1 rounded-full">
                      Class {exam.Class}
                    </span>
                    <h3 className="text-xl font-bold mt-2 line-clamp-1">
                      {exam.ExamName}
                    </h3>
                  </div>
                  <span className="text-sm bg-black/20 px-2 py-1 rounded-full">
                    #{exam.ExamCode}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-gray-600">
                    <Calendar size={18} className="mr-3 text-blue-500" />
                    <span className="text-sm">
                      Created: {new Date(exam.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex items-center text-gray-600">
                    <Users size={18} className="mr-3 text-green-500" />
                    <span className="text-sm">
                      Participants: {exam.Participants || 0}
                    </span>
                  </div>

                  <div className="flex items-center text-gray-600">
                    <BookOpen size={18} className="mr-3 text-purple-500" />
                    <span className="text-sm">
                      Duration: {exam.Duration || "N/A"} mins
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedExam(exam);
                    }}
                    className="flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
                  >
                    <Eye size={16} className="mr-1" />
                    View
                  </button>

                  <div className="flex space-x-2">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setExamdata(exam);
                      }}
                      className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
                    >
                      <Edit3 size={16} className="mr-1" />
                      Edit
                    </button>

                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setConfirmDelete(exam._id);
                      }}
                      className="flex items-center bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors text-sm font-medium"
                    >
                      <Trash2 size={16} className="mr-2" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      {ExamData && (
        <UpdateExamModel Exam={ExamData} closeModal={() => setExamdata(null)} />
      )}
    </div>
  );
};

export default AllExams;
