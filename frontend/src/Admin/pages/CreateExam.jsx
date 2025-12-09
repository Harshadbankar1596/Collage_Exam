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

            <div className="space-y-8">
              {fields.map((item, index) => (
                <div
                  key={item.id}
                  className="p-6 border-2 border-gray-200 rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 relative group"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-extrabold text-xl text-indigo-600">
                      Question {index + 1}
                    </h4>
                    {/* Remove Button */}
                    <button
                      type="button"
                      onClick={() => {
                        if (fields.length > 1) remove(index);
                        else
                          toast.info(
                            "At least one question is required to save the exam."
                          );
                      }}
                      className="p-2 -mt-2 -mr-2 text-red-500 hover:bg-red-50 rounded-full transition-colors opacity-70 group-hover:opacity-100"
                      title="Remove Question"
                    >
                      <Trash2 />
                    </button>
                  </div>

                  {/* Question Name (Textarea for more space) */}
                  <div className="mb-4">
                    <label className="text-gray-700 font-medium mb-1 block">
                      Question Text
                    </label>
                    <textarea
                      {...register(`Questions.${index}.Name`, {
                        required: "Question text is required",
                      })}
                      placeholder="Type the full question here..."
                      rows={3}
                      className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-150 shadow-sm resize-none"
                    />
                    {errors.Questions?.[index]?.Name && (
                      <p className="text-red-500 text-xs mt-1 font-semibold">
                        {errors.Questions[index].Name.message}
                      </p>
                    )}
                  </div>

                  {/* Options */}
                  <div className="grid sm:grid-cols-2 gap-4 mb-6">
                    {OptionLabels.map((label, optIdx) => (
                      <div
                        key={optIdx}
                        className="flex items-center space-x-2 bg-gray-50 p-3 rounded-lg border border-gray-200"
                      >
                        <span className="font-bold text-indigo-600 w-6 h-6 flex items-center justify-center bg-indigo-100 rounded-full text-xs shrink-0">
                          {label}
                        </span>
                        <input
                          {...register(`Questions.${index}.Options.${optIdx}`, {
                            required: `Option ${label} is required`,
                          })}
                          placeholder={`Enter option ${label}`}
                          className="w-full border-none rounded-lg p-1 focus:outline-none focus:ring-0 bg-gray-50"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Correct Answer Dropdown */}
                  <div>
                    <label className="text-gray-700 font-medium mb-1 block">
                      Correct Answer (Select the text of the correct option)
                    </label>
                    <select
                      {...register(`Questions.${index}.Answer`, {
                        required: "The correct answer must be selected",
                      })}
                      className="w-full border border-gray-300 rounded-lg p-3 bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-150 shadow-sm"
                    >
                      <option value="">-- Select Correct Option --</option>
                      {/* Map the current options for this question into the dropdown */}
                      {questions[index] &&
                        questions[index].Options.map(
                          (optionText, optIdx) =>
                            // Only show options that have text entered
                            optionText.trim() && (
                              <option key={optIdx} value={optionText}>
                                {OptionLabels[optIdx]}. {optionText}
                              </option>
                            )
                        )}
                    </select>
                    {errors.Questions?.[index]?.Answer && (
                      <p className="text-red-500 text-xs mt-1 font-semibold">
                        {errors.Questions[index].Answer.message}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Add Question Button */}
            <div className="mt-8 ">
              <button
                type="button"
                onClick={() =>
                  append({ Name: "", Options: ["", "", "", ""], Answer: "" })
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
      ${
        isLoading
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
