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

const calculateResult = (questions, answers, markPerQ) => {
  const answerMap = {};
  answers.forEach(a => {
    answerMap[a.QuestionId] = (a.Submit || "").trim();
  });

  let totalMarks = 0;
  let breakdown = [];

  questions.forEach(q => {
    const submit = answerMap[q._id] || "";
    let isCorrect = false;

    if (q.QuestionType === "MCQ") {
      isCorrect = submit && submit === q.Answer;
    }

    if (q.QuestionType === "TEXT") {
      isCorrect = submit.length > 0;
    }

    if (isCorrect) totalMarks += markPerQ;

    breakdown.push({
      _id: q._id,
      name: q.Name,
      type: q.QuestionType,
      submit,
      isCorrect,
    });
  });

  return { totalMarks, breakdown };
};


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


const StudentCard = ({ sub, questions, markPerQ }) => {
  const [open, setOpen] = React.useState(false);

  const { totalMarks, breakdown } = calculateResult(
    questions,
    sub.Answers || [],
    markPerQ
  );

  return (
    <div className="bg-white border rounded-lg p-4">

      {/* HEADER */}
      <div
        onClick={() => setOpen(!open)}
        className="flex justify-between items-center cursor-pointer"
      >
        <div>
          <p className="font-semibold text-gray-800">
            {sub.UserId?.Name || "Unknown"}
          </p>
          <p className="text-sm text-gray-500">
            Roll: {sub.UserId?.RollNo || "-"}
          </p>
        </div>

        <p className="text-lg font-bold text-blue-700">
          {totalMarks} Marks
        </p>
      </div>

      {/* DROPDOWN */}
      {open && (
        <div className="mt-4 space-y-3">
          {breakdown.map((q, idx) => (
            <div key={q._id} className="border p-3 rounded-md">
              <p className="text-sm font-medium">
                {idx + 1}. {q.name}
                <span className="ml-2 text-xs text-gray-500">
                  ({q.type})
                </span>
              </p>

              <p className="text-xs mt-1">
                <span className="font-semibold">Submitted:</span>{" "}
                {q.submit || "—"}
              </p>

              <p
                className={`text-xs mt-1 font-semibold ${q.isCorrect ? "text-green-600" : "text-red-600"
                  }`}
              >
                {q.isCorrect ? "Marks Awarded" : "No Marks"}
              </p>
            </div>
          ))}
        </div>
      )}
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
          <div className="p-6 bg-white rounded-lg border text-center">
            No submissions yet.
          </div>
        ) : (
          submissions.map((sub) => (
            <StudentCard
              key={sub._id}
              sub={sub}
              questions={exam.Questions}
              markPerQ={exam.MarkPerQuestion}
            />
          ))
        )}
      </div>

    </div>
  );
};

export default SubmittedExam;