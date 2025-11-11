import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "adminapi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/admin`,
    credentials: "include",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["projects", "users", "job", "leave"],
  endpoints: (builder) => ({
    registerAdmin: builder.mutation({
      query: (data) => ({
        url: "/create-admin",
        method: "POST",
        body: data,
      }),
    }),

    loginAdmin: builder.mutation({
      query: (data) => ({
        url: "/login-admin",
        method: "POST",
        body: data,
      }),
    }),

    logoutAdmin : builder.mutation({
      query : ()=>({
        url : "/logout-admin",
        method : "POST",
      })
    }),


  }),
});

export const { useRegisterAdminMutation, useLoginAdminMutation , useLogoutAdminMutation} = apiSlice;
