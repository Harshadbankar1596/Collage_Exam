import React from "react";
import { X, CheckCircle, HelpCircle } from "lucide-react";

const ExamDetail = ({ exam, onClose }) => {
  if (!exam) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl p-6 relative animate-slideUp overflow-y-auto max-h-[90vh]">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-red-500 transition"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Title */}
        <h2 className="text-3xl font-bold text-yellow-600 flex items-center gap-2 mb-6">
          <HelpCircle className="w-8 h-8" /> Exam Questions
        </h2>

        {/* Questions Loop */}
        <div className="space-y-8">
          {exam?.Questions?.map((question, qIndex) => (
            <div key={qIndex} className="border-b pb-4">

              {/* Question Title */}
              <pre className="text-lg font-semibold text-gray-900 mb-3 whitespace-pre-wrap">
                {qIndex + 1}. {question.Name}
              </pre>


              {/* Options */}
              <div className="space-y-2">
                {question.Options.map((opt, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-xl border flex justify-between items-center shadow-sm
                    ${question.Answer === opt
                        ? "bg-green-100 border-green-500"
                        : "bg-gray-50 border-gray-300"}`}
                  >
                    <span>{opt}</span>

                    {question.Answer === opt && (
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <button
            onClick={onClose}
            className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold shadow hover:bg-orange-700 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExamDetail;