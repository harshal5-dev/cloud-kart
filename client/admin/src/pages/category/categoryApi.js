import { createApi } from "@reduxjs/toolkit/query/react";

import { baseQuery, transformResponse } from "../../lib/utils";

const categoryBaseUrl = "/admin/categories";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: baseQuery,
  tagTypes: ["Category"],

  refetchOnMountOrArgChange: false,
  refetchOnFocus: false,
  refetchOnReconnect: false,
  // Keep cache longer for categories since they don't change frequently
  keepUnusedDataFor: 900, // 15 minutes
  endpoints: (builder) => ({
    // Fetches all categories at once (no server-side pagination)
    getCategories: builder.query({
      query: () => categoryBaseUrl,
      providesTags: [{ type: "Category", id: "LIST" }],
      transformResponse: transformResponse,
      keepUnusedDataFor: 900, // Keep cache for 15 minutes (longer since no pagination)
    }),
    getCategoryCount: builder.query({
      query: () => `${categoryBaseUrl}/count`,
      providesTags: [{ type: "Category", id: "COUNT" }],
      transformResponse: transformResponse,
      keepUnusedDataFor: 900, // Keep cache for 15 minutes (longer since no pagination)
    }),
    createCategory: builder.mutation({
      query: (category) => ({
        url: categoryBaseUrl,
        method: "POST",
        body: category,
      }),
      invalidatesTags: [
        { type: "Category", id: "LIST" },
        { type: "Category", id: "COUNT" },
      ],
    }),
    updateCategory: builder.mutation({
      query: (category) => ({
        url: `${categoryBaseUrl}/${category?.curSlug}`,
        method: "PUT",
        body: category,
      }),
      invalidatesTags: [
        { type: "Category", id: "LIST" },
        { type: "Category", id: "COUNT" },
      ],
    }),
    deleteCategory: builder.mutation({
      query: (slug) => ({
        url: `${categoryBaseUrl}/${slug}`,
        method: "DELETE",
      }),
      invalidatesTags: [
        { type: "Category", id: "LIST" },
        { type: "Category", id: "COUNT" },
      ],
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
