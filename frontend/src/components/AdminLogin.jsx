import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useLoginAdminMutation } from "../redux/Admin/AdminApi";
import { setAdmin } from "../redux/Admin/AdminSlice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import Logo from "./Logo";
import Name from "./Name";

const AdminLogin = () => {
  const [loginAdmin, { isLoading }] = useLoginAdminMutation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  const submit = async (data) => {
    try {
      const response = await loginAdmin(data).unwrap();
      toast.success("Login Successful!");
      console.log("Login :", response);
      dispatch(setAdmin(response));
      navigate("/admin/dashboard");
    } catch (err) {
      console.error("Login Error:", err);
      toast.error(err?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 py-8 bg-gray-50">
      <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
        <div
          className="relative w-full md:w-1/2 text-white flex flex-col justify-center items-center px-6 sm:px-10 py-10 sm:py-14 
             bg-[url('/examcunduct.png')] bg-cover bg-center bg-no-repeat overflow-hidden"
        >
          <div className="absolute inset-0 bg-black/70 z-0"></div>
          <div className="absolute inset-0 opacity-10 bg-[url('/pattern.svg')] bg-cover bg-center z-10"></div>

          <div className="relative z-20 flex flex-col justify-center items-center text-center">
            <div className="flex items-center justify-center mb-8 sm:mb-10 gap-2 group">
              <Logo />
              <Name size={28} />
            </div>

            <h2 className="text-lg sm:text-2xl font-semibold leading-snug text-center mb-4 sm:mb-6 px-2">
              Empower your{" "}
              <span className="text-yellow-400">Teaching Journey</span> with
              modern tools and insights.
            </h2>

            <div className="flex gap-2 mt-6">
              <span className="w-6 h-1 rounded-full bg-yellow-400"></span>
              <span className="w-6 h-1 rounded-full bg-gray-400/50"></span>
              <span className="w-6 h-1 rounded-full bg-gray-400/50"></span>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 px-6 sm:px-10 py-10 sm:py-14 flex flex-col justify-center">
          <div className="mb-6 text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Teacher Login
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Login to your teacher account.
            </p>
          </div>

          <form
            onSubmit={handleSubmit(submit)}
            className="flex flex-col gap-5 text-sm"
          >
            <div>
              <label className="text-gray-700 mb-1 block font-medium">
                E-mail Address
              </label>
              <input
                {...register("Email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                })}
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
              {errors.Email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.Email.message}
                </p>
              )}
            </div>

            <div>
              <label className="text-gray-700 mb-1 block font-medium">
                Password
              </label>
              <input
                type="password"
                {...register("Password", { required: "Password is required" })}
                placeholder="Enter your password"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
              {errors.Password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.Password.message}
                </p>
              )}
            </div>

            <div className="flex justify-end">
              <Link
                to={"/admin/forgotpassword"}
                className="text-blue-600 font-semibold hover:underline text-sm"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="bg-[#1e3a8a] text-white font-semibold py-3 rounded-lg hover:bg-[#172b6d] transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-60"
            >
              {isLoading ? "Login..." : "Login"}
            </button>

            <p className="text-center text-gray-600 text-sm mt-3">
              Not registered?{" "}
              <Link
                to={"/admin/register"}
                className="text-blue-600 font-semibold hover:underline"
              >
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
