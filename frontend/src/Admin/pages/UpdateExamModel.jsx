import React, { useEffect } from "react";
import { useUpdateExamMutation } from "../../redux/Admin/AdminApi";
import { toast } from "react-toastify";
import { useForm, useFieldArray } from "react-hook-form";
import { X, Trash2, MonitorCog, NotebookText, CirclePlus } from "lucide-react";
import { useSelector } from "react-redux";

const OptionLabels = ["A", "B", "C", "D"];

const UpdateExamModel = ({ Exam, closeModal }) => {
  const [UpdateExam, { isLoading: updateloading }] = useUpdateExamMutation();
  const admin = useSelector((state) => state.admin);

  const { register, control, handleSubmit, reset, watch } = useForm({
    defaultValues: {
      ExamName: "",
      ExamCode: "",
      Class: "",
      MarkPerQuestion: 0,
      Duration: 0,
      Questions: [],
    },
  });

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "Questions",
  });

  const questions = watch("Questions") || [];

  useEffect(() => {
    if (Exam) {
      reset(Exam);
      replace(Exam.Questions || []);
    }
  }, [Exam]);

  const onSubmit = async (data) => {
    const payload = {
      AdminId: admin.id,
      ExamId: Exam._id,
      updateData: { ...data, _id: Exam._id },
    };

    try {
      await UpdateExam(payload).unwrap();
      toast.success("Exam updated successfully!");
      closeModal();
    } catch (err) {
      toast.error(err?.data?.message || "Unknown Error");
    }
  };

  if (!Exam) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
      {/* MODAL BOX */}
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl p-6 relative animate-slideUp overflow-y-auto max-h-[90vh]">
        {/* CLOSE BUTTON */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-200"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-3xl font-bold text-center mb-6">Update Exam</h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-10"
        >
          {/* GENERAL SETTINGS */}
          <div className="p-6 bg-indigo-50 rounded-xl border">
            <h3 className="font-bold text-xl mb-3 flex gap-2 items-center">
              <MonitorCog /> General Settings
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                {...register("ExamName")}
                placeholder="Exam Name"
                className="border p-3 rounded w-full"
              />
              <input
                {...register("ExamCode")}
                placeholder="Exam Code"
                className="border p-3 rounded w-full"
              />
              <input
                {...register("Class")}
                placeholder="Class"
                className="border p-3 rounded w-full"
              />
              <input
                {...register("Duration", { valueAsNumber: true })}
                type="number"
                placeholder="Duration (Minutes)"
                className="border p-3 rounded w-full"
              />
              <input
                {...register("MarkPerQuestion", { valueAsNumber: true })}
                type="number"
                placeholder="Marks Per Question"
                className="border p-3 rounded w-full"
              />
            </div>
          </div>

          {/* QUESTIONS */}
          <div>
            <h3 className="text-xl font-bold mb-4 flex gap-2 items-center">
              <NotebookText /> Update Questions ({fields.length})
            </h3>

            {fields.map((item, index) => (
              <div key={item.id} className="p-4 border rounded mb-4 relative">
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="absolute top-0 -right-6 text-red-600"
                >
                  <Trash2 />
                </button>

                <textarea
                  {...register(`Questions.${index}.Name`)}
                  placeholder={`Question ${index + 1}`}
                  className="border p-2 w-full rounded mb-3"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {OptionLabels.map((lbl, optIdx) => (
                    <input
                      key={optIdx}
                      {...register(`Questions.${index}.Options.${optIdx}`)}
                      placeholder={`Option ${lbl}`}
                      className="border p-2 rounded w-full"
                    />
                  ))}
                </div>

                <select
                  {...register(`Questions.${index}.Answer`)}
                  className="border p-2 w-full rounded mt-3"
                >
                  <option value="">Select Correct Answer</option>
                  {questions[index]?.Options?.map(
                    (opt, i) =>
                      opt && (
                        <option key={i} value={opt}>
                          {opt}
                        </option>
                      )
                  )}
                </select>
              </div>
            ))}

            <button
              type="button"
              onClick={() =>
                append({ Name: "", Options: ["", "", "", ""], Answer: "" })
              }
              className="bg-blue-600 text-white p-2 rounded flex items-center gap-1"
            >
              <CirclePlus className="w-5 h-5" /> Add New Question
            </button>
          </div>

          <button
            type="submit"
            disabled={updateloading}
            className="bg-green-600 text-white p-3 rounded text-center font-semibold disabled:bg-green-400"
          >
            {updateloading ? "Updating..." : "Update Exam"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateExamModel;
