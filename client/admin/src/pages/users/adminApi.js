import { createApi } from "@reduxjs/toolkit/query/react";

import { baseQuery, transformErrorResponse } from "../../lib/utils";

const adminBaseUrl = "/admin";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: baseQuery,
  tagTypes: ["Users"],

  refetchOnMountOrArgChange: false,
  refetchOnFocus: false,
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: ({ page, pageSize, searchTerm = "" }) =>
        `${adminBaseUrl}/users/search?searchTerm=${searchTerm}&page=${
          page - 1
        }&size=${pageSize}&sortBy=id&sortDir=desc`,
      providesTags: ["Users"],
      keepUnusedDataFor: 5555,
    }),
    createUser: builder.mutation({
      query: (user) => ({
        url: `${adminBaseUrl}/users/create`,
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["Users"],
      transformErrorResponse: transformErrorResponse,
    }),
    updateUser: builder.mutation({
      query: ({ id, user }) => ({
        url: `${adminBaseUrl}/users/${id}/update`,
        method: "PUT",
        body: user,
      }),
      invalidatesTags: ["Users"],
      transformErrorResponse: transformErrorResponse,
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `${adminBaseUrl}/users/${id}/delete`,
        method: "DELETE",
      }),
      transformErrorResponse: transformErrorResponse,
    }),
  }),
});

export const {
  useGetUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = adminApi;
