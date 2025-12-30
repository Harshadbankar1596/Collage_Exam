// SubmittedExam.jsx
import React from "react";
import { useParams } from "react-router-dom";
import { useGetSubmittedExamQuery } from "../../../redux/Admin/AdminApi";
import Loader from "../../../components/Loader";
import {
  BookOpen,
  Clock,
  Users,
  CheckCircle,
  XCircle,
  User,
  Mail,
  Hash,
} from "lucide-react";


const SmallExamCard = ({ exam }) => {
  if (!exam) return null;

  return (
    <div className="w-full bg-white rounded-xl shadow-sm border p-5">
      {/* Top section */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">{exam.ExamName}</h2>
          <p className="text-sm text-gray-500 mt-1">Code: <span className="font-medium">#{exam.ExamCode}</span></p>
        </div>

        <div className="text-right">
          <p className="text-xs text-gray-500">Created</p>
          <p className="text-sm text-gray-700 font-medium">
            {new Date(exam.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Bottom details */}
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4">

        {/* Class */}
        <div className="flex items-center space-x-2">
          <BookOpen className="text-blue-600" size={20} />
          <div>
            <p className="text-xs text-gray-500">Class</p>
            <p className="text-sm font-semibold text-gray-800">{exam.Class}</p>
          </div>
        </div>

        {/* Duration */}
        <div className="flex items-center space-x-2">
          <Clock className="text-green-600" size={20} />
          <div>
            <p className="text-xs text-gray-500">Duration</p>
            <p className="text-sm font-semibold text-gray-800">{exam.Duration} min</p>
          </div>
        </div>

        {/* Mark Per Question */}
        <div className="flex items-center space-x-2">
          <Hash className="text-red-600" size={20} />
          <div>
            <p className="text-xs text-gray-500">Mark / Q</p>
            <p className="text-sm font-semibold text-gray-800">{exam.MarkPerQuestion}</p>
          </div>
        </div>

        {/* Participants */}
        <div className="flex items-center space-x-2">
          <Users className="text-purple-700" size={20} />
          <div>
            <p className="text-xs text-gray-500">Participants</p>
            <p className="text-sm font-semibold text-gray-800">
              {exam.Participants || 0}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

const StudentCard = ({ sub, questionsMap, markPerQ, qList }) => {
  // build quick map of student's answers by QuestionId
  const studentAnswers = {};
  (sub.Answers || []).forEach((a) => {
    if (a && a.QuestionId) studentAnswers[a.QuestionId] = a.Submit;
  });

  // calculate correct count
  let correctCount = 0;
  qList.forEach((q) => {
    const qid = q?._id;
    const studentAns = studentAnswers[qid];
    if (studentAns !== undefined && String(studentAns).trim() === String(q?.Answer).trim()) {
      correctCount++;
    }
  });

  const totalMarks = correctCount * (markPerQ || 0);

  return (
    <div className="w-full bg-white rounded-lg border shadow-sm p-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <User size={20} className="text-blue-900" />
          <div>
            <p className="text-md font-bold text-gray-800">{sub.UserId?.Name || "Unknown"}</p>
            <p className="text-sm text-gray-500">Roll: {sub.UserId?.RollNo || "-"}</p>
            <p className="text-xs text-gray-400">PRN: {sub.UserId?.PRN || "-"}</p>
            <div className="text-sm text-gray-500 flex items-center space-x-2 mt-1">
              <Mail size={14} /> <span>{sub.UserId?.Email || "-"}</span>
            </div>
          </div>
        </div>

        <div className="text-right">
          <p className="text-sm text-gray-500">Submitted</p>
          <p className="text-sm font-medium">
            {new Date(sub.createdAt).toLocaleString()}
          </p>
        </div>
      </div>

      {/* score row */}
      <div className="mt-3 flex items-center justify-between border-t pt-3">
        <div className="flex items-center space-x-3">
          <div className="flex items-center bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm">
            <CheckCircle size={16} className="mr-2" /> {correctCount} / {qList.length}
          </div>

          <div className="flex items-center bg-blue-50 text-blue-900 px-3 py-1 rounded-full text-sm">
            <Hash size={14} className="mr-2" /> {totalMarks} marks
          </div>
        </div>

        <div className="text-sm text-gray-500">Questions: {qList.length}</div>
      </div>

      {/* per-question breakdown */}
      <div className="mt-4 space-y-3">
        {qList.map((q, idx) => {
          const qid = q?._id;
          const studentAns = studentAnswers[qid];
          const correct = String(studentAns || "").trim() === String(q?.Answer || "").trim();

          return (
            <div key={qid || idx} className="p-3 border rounded-md">
              <div className="flex items-start justify-between">
                <div className="w-[70%]">
                  <p className="text-sm font-medium text-gray-800">{idx + 1}. {q?.Name || "Question"}</p>
                  <p className="text-xs text-gray-500 mt-1">Correct: <span className="font-semibold">{q?.Answer || "-"}</span></p>
                </div>

                <div className="w-[28%] text-right">
                  {studentAns === undefined || studentAns === null || studentAns === "" ? (
                    <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-yellow-100 text-yellow-700">
                      No Answer
                    </span>
                  ) : correct ? (
                    <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-green-100 text-green-700">
                      <CheckCircle size={14} className="mr-1" /> {studentAns}
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-red-100 text-red-700">
                      <XCircle size={14} className="mr-1" /> {studentAns}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const SubmittedExam = () => {
  const { ExamId } = useParams();
  const { data, isLoading } = useGetSubmittedExamQuery(ExamId);

  
  const exam = data?.Exam || {};
  const submissions = data?.SubmitedExam || [];
  
  // prepare question list and map for quick lookup
  const questions = Array.isArray(exam?.Questions) ? exam.Questions : [];
  const questionsMap = {};
  questions.forEach((q) => {
    if (q && q._id) questionsMap[q._id] = q;
  });
  
  if (isLoading) return <Loader text={"Loading Exams..."} />;
  return (
    <div className="min-h-screen w-full p-6 flex flex-col items-center gap-6">
      <div className="w-full max-w-4xl">
        <SmallExamCard exam={exam} />
      </div>

      <div className="w-full max-w-4xl grid gap-4">
        {submissions.length === 0 ? (
          <div className="p-6 bg-white rounded-lg border text-center">No submissions yet.</div>
        ) : (
          submissions.map((sub) => (
            <StudentCard
              key={sub._id}
              sub={sub}
              questionsMap={questionsMap}
              qList={questions}
              markPerQ={exam.MarkPerQuestion}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default SubmittedExam;