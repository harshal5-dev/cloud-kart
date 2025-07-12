import { createApi } from "@reduxjs/toolkit/query/react";

import { baseQuery, transformResponse } from "../../lib/utils";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: baseQuery,
  tagTypes: ["Category"],
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => "/public/category/fetchAll",
      providesTags: ["Category"],
      transformResponse: transformResponse,
    }),
  }),
});

export const { useGetCategoriesQuery } = categoryApi;
