import { createApi } from "@reduxjs/toolkit/query/react";

import { baseQuery, transformErrorResponse } from "../../lib/utils";

const adminBaseUrl = "/admin";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: baseQuery,
  tagTypes: ["Users"],

  refetchOnMountOrArgChange: false,
  refetchOnFocus: false,
  refetchOnReconnect: false,
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: ({ page, pageSize, searchTerm = "" }) =>
        `${adminBaseUrl}/users/search?searchTerm=${searchTerm}&page=${
          page - 1
        }&size=${pageSize}&sortBy=firstName&sortDir=asc`,
      providesTags: (result, error, arg) => [
        { type: "Users", id: "LIST" },
        {
          type: "Users",
          id: `LIST-${arg.page}-${arg.pageSize}-${arg.searchTerm}`,
        },
      ],
      keepUnusedDataFor: 600, // Keep cache for 10 minutes
    }),
    createUser: builder.mutation({
      query: (user) => ({
        url: `${adminBaseUrl}/users/create`,
        method: "POST",
        body: user,
      }),
      invalidatesTags: [{ type: "Users", id: "LIST" }],
      transformErrorResponse: transformErrorResponse,
    }),
    updateUser: builder.mutation({
      query: ({ id, user }) => ({
        url: `${adminBaseUrl}/users/${id}/update`,
        method: "PUT",
        body: user,
      }),
      invalidatesTags: [{ type: "Users", id: "LIST" }],
      transformErrorResponse: transformErrorResponse,
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `${adminBaseUrl}/users/${id}/delete`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Users", id: "LIST" }],
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
