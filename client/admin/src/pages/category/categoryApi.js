import { createApi } from "@reduxjs/toolkit/query/react";

import { baseQuery, transformResponse } from "../../lib/utils";

const categoryBaseUrl = "/admin/categories";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: baseQuery,
  tagTypes: ["Category"],

  refetchOnMountOrArgChange: false,
  refetchOnFocus: false,
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => categoryBaseUrl,
      providesTags: ["Category"],
      transformResponse: transformResponse,
      keepUnusedDataFor: 555,
    }),
    getCategoryCount: builder.query({
      query: () => `${categoryBaseUrl}/count`,
      providesTags: ["Category"],
      transformResponse: transformResponse,
      keepUnusedDataFor: 555,
    }),
    createCategory: builder.mutation({
      query: (category) => ({
        url: categoryBaseUrl,
        method: "POST",
        body: category,
      }),
      invalidatesTags: ["Category"],
    }),
    updateCategory: builder.mutation({
      query: (category) => ({
        url: `${categoryBaseUrl}/${category?.curSlug}`,
        method: "PUT",
        body: category,
      }),
      invalidatesTags: ["Category"],
    }),
    deleteCategory: builder.mutation({
      query: (slug) => ({
        url: `${categoryBaseUrl}/${slug}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryCountQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
