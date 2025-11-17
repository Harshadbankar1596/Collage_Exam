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

    logoutAdmin: builder.mutation({
      query: () => ({
        url: "/logout-admin",
        method: "POST",
      })
    }),

    createExam: builder.mutation({
      query: (data) => ({
        url: "/create-exam",
        method: "POST",
        body: data
      }),
      invalidatesTags: ["exam"]
    }),

    getAllExam: builder.query({
      query: ({ id, page, limit }) => ({
        url: `/getall-exams/${id}?page=${page}&limit=${limit}`,
        method: "GET"
      }),
      providesTags: ["exam"]
    }),

    getExamById : builder.query({
      query : ({ExamId})=>({
        url : `/get-exam/${ExamId}`,
        method : "GET"
      })
    }),

    deleteExam: builder.mutation({
      query: ({ AdminId, ExamId }) => ({
        url: "/delete-exam",
        method: "POST",
        body: { AdminId, ExamId }
      }),
      invalidatesTags: ["exam"]
    }),

    updateExam : builder.mutation({
      query : (formData)=>({
        url : "/update-exam",
        method : "PUT",
        body : formData
      }),
      invalidatesTags: ["exam"]
    })

  }),
});

export const { useRegisterAdminMutation, useLoginAdminMutation, useLogoutAdminMutation, useCreateExamMutation, useGetAllExamQuery, useGetExamByIdQuery , useDeleteExamMutation , useUpdateExamMutation} = apiSlice;
