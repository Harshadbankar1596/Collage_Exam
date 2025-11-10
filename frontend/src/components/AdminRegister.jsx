import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterAdminMutation } from "../redux/Admin/AdminApi";
import { setAdmin } from "../redux/Admin/AdminSlice";
import { toast } from "react-toastify"
import { useDispatch } from "react-redux";
import Logo from "./Logo";

const Register = () => {
    const [registerAdmin, { isLoading }] = useRegisterAdminMutation();
    const navigate = useNavigate(); const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const dispatch = useDispatch()


    const submit = async (data) => {
        try {
            const response = await registerAdmin(data).unwrap();
            toast.success("Registration Successful!");
            console.log("Admin Registered:", response);
            dispatch(setAdmin(response))
            navigate("/admin/dashboard")
        } catch (err) {
            console.error("Registration Error:", err);
            toast.error(err?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center ">
            <div className="flex w-[90%] max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
                <div
                    className="w-1/2 text-white flex flex-col justify-center items-center px-10 py-14 relative 
             bg-[url('/examcunduct.png')] bg-cover bg-center bg-no-repeat overflow-hidden"
                >
                    <div className="absolute inset-0 bg-black/70 z-0"></div>
                    <div className="absolute inset-0 opacity-10 bg-[url('/pattern.svg')] bg-cover bg-center z-10"></div>

                    <div className="relative z-20 flex flex-col justify-center items-center text-center">
                        <div className="flex items-center justify-center mb-10 gap-2 group">
                            <Logo />
                            <p className="text-5xl font-extrabold text-white tracking-tight transition-all duration-500 group-hover:text-yellow-300 group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] group-hover:scale-105">
                                Ptimized
                            </p>
                        </div>

                        <h2 className="text-2xl font-semibold leading-snug text-center mb-4">
                            Empower your <span className="text-yellow-400">Teaching Journey</span> with modern tools and insights.
                        </h2>

                        <div className="flex gap-2 mt-6">
                            <span className="w-6 h-1 rounded-full bg-yellow-400"></span>
                            <span className="w-6 h-1 rounded-full bg-gray-400/50"></span>
                            <span className="w-6 h-1 rounded-full bg-gray-400/50"></span>
                        </div>
                    </div>
                </div>

                <div className="w-1/2 px-10 py-14 flex flex-col justify-center">
                    <div className="mb-6">
                        <h2 className="text-3xl font-bold text-gray-800">Teacher Register</h2>
                        <p className="text-gray-500 text-sm mt-1">Create your free teacher account.</p>
                    </div>

                    <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-5 text-sm">
                        <div>
                            <label className="text-gray-700 mb-1 block font-medium">Name</label>
                            <input
                                {...register("Name", { required: "Name is required" })}
                                placeholder="Enter your full name"
                                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                            />
                            {errors.Name && <p className="text-red-500 text-xs mt-1">{errors.Name.message}</p>}
                        </div>

                        <div>
                            <label className="text-gray-700 mb-1 block font-medium">E-mail Address</label>
                            <input
                                {...register("Email", {
                                    required: "Email is required",
                                    pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" },
                                })}
                                placeholder="Enter your email"
                                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                            />
                            {errors.Email && <p className="text-red-500 text-xs mt-1">{errors.Email.message}</p>}
                        </div>

                        <div>
                            <label className="text-gray-700 mb-1 block font-medium">Phone</label>
                            <input
                                {...register("Phone", {
                                    required: "Phone is required",
                                    pattern: { value: /^[0-9]{7,15}$/, message: "Invalid phone number" },
                                    minLength: {
                                        value: 10,
                                        message: "Phone number must be at least 10 digits"
                                    },
                                    maxLength: {
                                        value: 10,
                                        message: "Phone number can't exceed 10 digits"
                                    }
                                })}
                                placeholder="Enter your phone number"
                                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                            />
                            {errors.Phone && <p className="text-red-500 text-xs mt-1">{errors.Phone.message}</p>}
                        </div>

                        <div>
                            <label className="text-gray-700 mb-1 block font-medium">Password</label>
                            <input
                                type="password"
                                {...register("Password", { required: "Password is required" })}
                                placeholder="Enter your password"
                                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                            />
                            {errors.Password && <p className="text-red-500 text-xs mt-1">{errors.Password.message}</p>}
                        </div>

                        <div>
                            <label className="text-gray-700 mb-1 block font-medium">Role</label>
                            <input
                                {...register("Role", { required: "Role is required" })}
                                placeholder="Enter your role (e.g., Teacher)"
                                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                            />
                            {errors.Role && <p className="text-red-500 text-xs mt-1">{errors.Role.message}</p>}
                        </div>

                        <div>
                            <label className="text-gray-700 mb-1 block font-medium">College Name</label>
                            <input
                                {...register("CollegeName", { required: "College name is required" })}
                                placeholder="Enter your college name"
                                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                            />
                            {errors.CollegeName && <p className="text-red-500 text-xs mt-1">{errors.CollegeName.message}</p>}
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="bg-[#1e3a8a] text-white font-semibold py-3 rounded-lg hover:bg-[#172b6d] transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-60"
                        >
                            {isLoading ? "Registering..." : "Register"}
                        </button>

                        <p className="text-center text-gray-600 text-sm mt-3">
                            Already have an account?{" "}
                            <Link to={"/admin/login"} className="text-blue-600 font-semibold hover:underline">
                                Login
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
