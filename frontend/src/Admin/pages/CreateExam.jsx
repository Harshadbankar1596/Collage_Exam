import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { MonitorCog, NotebookText, Trash2, CirclePlus } from "lucide-react";
import { toast } from "react-toastify";
import { useCreateExamMutation } from "../../redux/Admin/AdminApi";
import { useSelector } from "react-redux";

const App = () => {
  const [submitExam, { isLoading }] = useCreateExamMutation();
  const adminINFO = useSelector((admin) => admin.admin); // Mocked selector

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      ExamName: "",
      ExamCode: "",
      Class: "",
      MarkPerQuestion: 5,
      Duration: 60,
      Questions: [
        {
          QuestionType: "MCQ", // ✅ ADD
          Name: "",
          Options: ["", "", "", ""],
          Answer: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "Questions",
  });

  const questions = watch("Questions");

  const onSubmit = async (formData) => {
    try {
      const payload = { ...formData, AdminId: adminINFO?.id || "" };
      await submitExam(payload).unwrap();
      toast.success("Exam created successfully! (Mock Success)");
      reset();
    } catch (err) {
      const message =
        err?.data?.message || "Failed to create exam. (Mock Error)";
      toast.error(message);
      console.error("Create exam error:", err);
    }
  };

  const OptionLabels = ["A", "B", "C", "D"];

  // Utility component for form field with error display
  const InputField = ({ label, name, type = "text", placeholder, rules }) => (
    <div>
      <label className="text-gray-700 font-medium mb-1 block">{label}</label>
      <input
        {...register(name, rules)}
        type={type}
        placeholder={placeholder}
        className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150 shadow-sm"
      />
      {errors[name] && (
        <p className="text-red-500 text-xs mt-1 font-semibold">
          {errors[name].message}
        </p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen w-full sm:p-8 flex justify-center items-start font-inter ">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl p-6 md:p-10 border-t-8 border-indigo-600">
        {/* Header */}
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-extrabold text-indigo-800 tracking-tight">
            <span className="inline-block transform -rotate-6 text-yellow-500 mr-2"></span>{" "}
            Create New Exam
          </h2>
          <p className="text-gray-500 mt-2 text-md">
            Design your exam structure, define general settings, and add
            questions.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-10"
        >
          <div className="p-6 bg-indigo-50 rounded-xl border border-indigo-200">
            <h3 className="text-2xl font-bold text-indigo-700 mb-6 border-b pb-2 border-indigo-300 flex items-center gap-2">
              <MonitorCog />
              General Settings
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="md:col-span-2 lg:col-span-4">
                <InputField
                  label="Exam Name"
                  name="ExamName"
                  placeholder="e.g : Math Exam 2nd Year"
                  rules={{ required: "Exam Name is required" }}
                />
              </div>

              <InputField
                label="Exam Code"
                name="ExamCode"
                placeholder="e.g : PHY101-MT"
                rules={{ required: "Exam Code is required" }}
              />

              <InputField
                label="Class"
                name="Class"
                placeholder="e.g : 2nd Year 3rd SEM"
                rules={{ required: "Class is required" }}
              />

              <InputField
                label="Duration (minutes)"
                name="Duration"
                type="number"
                placeholder="e.g. 60"
                rules={{
                  required: "Duration is required",
                  min: { value: 1, message: "Must be a positive number" },
                }}
              />

              <InputField
                label="Marks per Question"
                name="MarkPerQuestion"
                type="number"
                placeholder="e.g. 5"
                rules={{
                  required: "Marks are required",
                  min: { value: 1, message: "Must be a positive number" },
                }}
              />
            </div>
          </div>

          {/* Section 2: Questions */}
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2 flex items-center gap-2">
              <NotebookText />
              Question Editor ({fields.length})
            </h3>

            {/* <div className="mb-4">
              <label className="text-gray-700 font-medium mb-1 block">
                Question Type
              </label>

              <select
                {...register(`Questions.${index}.QuestionType`, {
                  required: true,
                })}
                className="w-full border rounded-lg p-2"
              >
                <option value="MCQ">MCQ</option>
                <option value="TEXT">TEXT</option>
              </select>
            </div> */}


            <div className="space-y-8">
              {fields.map((item, index) => (
                <div
                  key={item.id}
                  className="p-6 border-2 border-gray-200 rounded-xl bg-white shadow-lg"
                >
                  {/* HEADER */}
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-xl font-bold text-indigo-600">
                      Question {index + 1}
                    </h4>
                    <button
                      type="button"
                      onClick={() => fields.length > 1 && remove(index)}
                      className="text-red-500"
                    >
                      <Trash2 />
                    </button>
                  </div>

                  {/* ✅ QUESTION TYPE */}
                  <div className="mb-4">
                    <label className="font-medium block mb-1">Question Type</label>
                    <select
                      {...register(`Questions.${index}.QuestionType`, { required: true })}
                      className="w-full border rounded-lg p-2"
                    >
                      <option value="MCQ">MCQ</option>
                      <option value="TEXT">TEXT</option>
                    </select>
                  </div>

                  {/* QUESTION TEXT */}
                  <div className="mb-4">
                    <label className="font-medium block mb-1">Question</label>
                    <textarea
                      {...register(`Questions.${index}.Name`, { required: true })}
                      rows={3}
                      className="w-full border rounded-lg p-2"
                    />
                  </div>

                  {/* ✅ MCQ ONLY */}
                  {questions[index]?.QuestionType === "MCQ" && (
                    <>
                      {/* OPTIONS */}
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        {["A", "B", "C", "D"].map((label, optIdx) => (
                          <input
                            key={optIdx}
                            {...register(`Questions.${index}.Options.${optIdx}`, {
                              required: true,
                            })}
                            placeholder={`Option ${label}`}
                            className="border rounded p-2"
                          />
                        ))}
                      </div>

                      {/* ANSWER */}
                      <select
                        {...register(`Questions.${index}.Answer`, { required: true })}
                        className="w-full border rounded-lg p-2"
                      >
                        <option value="">Select Correct Answer</option>
                        {questions[index]?.Options.map(
                          (opt, i) =>
                            opt && (
                              <option key={i} value={opt}>
                                {opt}
                              </option>
                            )
                        )}
                      </select>
                    </>
                  )}
                </div>
              ))}


            </div>

            {/* Add Question Button */}
            <div className="mt-8 ">
              <button
                type="button"
                onClick={() =>
                  append({
                    QuestionType: "MCQ",
                    Name: "",
                    Options: ["", "", "", ""],
                    Answer: "",
                  })
                }

                className="inline-flex gap-2 bg-blue-500 text-white font-semibold px-6 py-3 ml-2 rounded-xl transition hover:scale-105"
              >
                <CirclePlus />
                Add Question
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8 text-center border-t border-gray-200 pt-8">
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full max-w-sm mx-auto block bg-green-500 text-white font-semibold py-3 px-10 rounded-lg shadow-md transition-all duration-200
      ${isLoading
                  ? "opacity-60 cursor-not-allowed"
                  : "hover:bg-green-800 active:scale-[0.98]"
                }`}
            >
              {isLoading ? "Creating Exam..." : "Create Exam"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default App;