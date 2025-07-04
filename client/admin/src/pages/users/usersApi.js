import { createApi } from "@reduxjs/toolkit/query/react";

import {
  baseQuery,
  transformErrorResponse,
  transformResponse,
} from "../../lib/utils";

const userBaseUrl = "/users";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQuery,
  tagTypes: ["Users"],
  refetchOnMountOrArgChange: false,
  refetchOnFocus: false,
  refetchOnReconnect: true,

  endpoints: (builder) => ({
    getUserProfile: builder.query({
      query: () => `${userBaseUrl}/me`,
      providesTags: ["Users"],
      transformResponse: transformResponse,
      transformErrorResponse: transformErrorResponse,
      keepUnusedDataFor: 555,
    }),
    updateUserProfile: builder.mutation({
      query: ({ id, user }) => ({
        url: `${userBaseUrl}/me/${id}`,
        method: "PUT",
        body: user,
      }),
      invalidatesTags: ["Users"],
      transformResponse: transformResponse,
      transformErrorResponse: transformErrorResponse,
    }),
  }),
});

export const { useGetUserProfileQuery, useUpdateUserProfileMutation } = userApi;
