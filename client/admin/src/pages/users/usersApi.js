import { createApi } from "@reduxjs/toolkit/query/react";

import { baseQuery, transformResponse } from "../../lib/utils";

const userBaseUrl = "/users";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQuery,
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    getUserProfile: builder.query({
      query: () => `${userBaseUrl}/me`,
      providesTags: ["Users"],
      transformResponse: transformResponse,
    }),
    updateUserProfile: builder.mutation({
      query: ({ id, user }) => ({
        url: `${userBaseUrl}/me/${id}`,
        method: "PUT",
        body: user,
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const { useGetUserProfileQuery, useUpdateUserProfileMutation } = userApi;
