import { createApi } from "@reduxjs/toolkit/query/react";

import {
  baseQuery,
  transformErrorResponse,
  transformResponse,
} from "../../lib/utils";

const addressBaseUrl = "/users";

export const addressApi = createApi({
  reducerPath: "addressApi",
  baseQuery: baseQuery,
  tagTypes: ["Address"],

  refetchOnMountOrArgChange: false,
  refetchOnFocus: false,
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    getUserAddresses: builder.query({
      query: (userId) => `${addressBaseUrl}/${userId}/addresses`,
      providesTags: ["Address"],
      transformResponse: transformResponse,
      transformErrorResponse: transformErrorResponse,
      keepUnusedDataFor: 5555,
    }),
    createUserAddress: builder.mutation({
      query: ({ userId, address }) => ({
        url: `${addressBaseUrl}/${userId}/addresses`,
        method: "POST",
        body: address,
      }),
      invalidatesTags: ["Address"],
      transformErrorResponse: transformErrorResponse,
    }),
    updateUserAddress: builder.mutation({
      query: ({ userId, id, address }) => ({
        url: `${addressBaseUrl}/${userId}/addresses/${id}`,
        method: "PUT",
        body: address,
      }),
      transformErrorResponse: transformErrorResponse,
      invalidatesTags: ["Address"],
    }),
    deleteUserAddress: builder.mutation({
      query: ({ userId, id }) => ({
        url: `${addressBaseUrl}/${userId}/addresses/${id}`,
        method: "DELETE",
      }),
      transformErrorResponse: transformErrorResponse,
      invalidatesTags: ["Address"],
    }),
  }),
});

export const {
  useGetUserAddressesQuery,
  useCreateUserAddressMutation,
  useUpdateUserAddressMutation,
  useDeleteUserAddressMutation,
} = addressApi;
