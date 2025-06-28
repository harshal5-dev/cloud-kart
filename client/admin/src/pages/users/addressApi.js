import { createApi } from "@reduxjs/toolkit/query/react";

import { baseQuery, transformResponse } from "../../lib/utils";

const addressBaseUrl = "/users";

export const addressApi = createApi({
  reducerPath: "addressApi",
  baseQuery: baseQuery,
  tagTypes: ["Address"],
  endpoints: (builder) => ({
    getUserAddresses: builder.query({
      query: (userId) => `${addressBaseUrl}/${userId}/addresses`,
      providesTags: ["Address"],
      transformResponse: transformResponse,
    }),
    createUserAddress: builder.mutation({
      query: ({ userId, address }) => ({
        url: `${addressBaseUrl}/${userId}/addresses`,
        method: "POST",
        body: address,
      }),
      invalidatesTags: ["Address"],
    }),
    updateUserAddress: builder.mutation({
      query: ({ userId, id, address }) => ({
        url: `${addressBaseUrl}/${userId}/addresses/${id}`,
        method: "PUT",
        body: address,
      }),
      invalidatesTags: ["Address"],
    }),
    deleteUserAddress: builder.mutation({
      query: ({ userId, id }) => ({
        url: `${addressBaseUrl}/${userId}/addresses/${id}`,
        method: "DELETE",
      }),
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
