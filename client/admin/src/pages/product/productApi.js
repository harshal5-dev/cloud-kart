import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery, transformResponse } from "../../lib/utils";

const productBaseUrl = "/admin/products";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: baseQuery,
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    getProductsInfo: builder.mutation({
      query: ({ page, pageSize, category = "" }) =>
        `${productBaseUrl}?page=${
          page - 1
        }&size=${pageSize}&category=${category}&sortBy=id&sortDir=desc`,
      providesTags: ["Product"],
    }),
    getProductCount: builder.query({
      query: () => `${productBaseUrl}/count`,
      providesTags: ["Product"],
      transformResponse: transformResponse,
    }),
    createProduct: builder.mutation({
      query: (product) => ({
        url: productBaseUrl,
        method: "POST",
        body: product,
      }),
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation({
      query: (product) => ({
        url: `${productBaseUrl}/${product.curSku}`,
        method: "PUT",
        body: product,
      }),
      invalidatesTags: ["Product"],
    }),
    deleteProduct: builder.mutation({
      query: (sku) => ({
        url: `${productBaseUrl}/${sku}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetProductsInfoMutation,
  useGetProductCountQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
