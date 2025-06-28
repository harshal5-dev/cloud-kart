import { createApi } from "@reduxjs/toolkit/query/react";

import {
  baseQuery,
  transformErrorResponse,
  transformResponse,
} from "../../lib/utils";

const adminBaseUrl = "/admin";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: baseQuery,
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    getUsers: builder.mutation({
      query: ({ page, pageSize, searchTerm = "" }) =>
        `${adminBaseUrl}/users/search?searchTerm=${searchTerm}&page=${
          page - 1
        }&size=${pageSize}&sortBy=id&sortDir=desc`,
      providesTags: ["Users"],
    }),
    createUser: builder.mutation({
      query: (user) => ({
        url: `${adminBaseUrl}/users/create`,
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["Users"],
      transformResponse: transformResponse,
      transformErrorResponse: transformErrorResponse,
    }),
    updateUser: builder.mutation({
      query: ({ id, user }) => ({
        url: `${adminBaseUrl}/users/${id}/update`,
        method: "PUT",
        body: user,
      }),
      invalidatesTags: ["Users"],
      transformResponse: transformResponse,
      transformErrorResponse: transformErrorResponse,
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `${adminBaseUrl}/users/${id}/delete`,
        method: "DELETE",
      }),
      transformResponse: transformResponse,
      transformErrorResponse: transformErrorResponse,
    }),
  }),
});

export const {
  useGetUsersMutation,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = adminApi;
