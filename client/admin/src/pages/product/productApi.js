import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery, transformResponse } from "../../lib/utils";

const productBaseUrl = "/admin/products";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: baseQuery,
  tagTypes: ["Product"],

  refetchOnMountOrArgChange: false,
  refetchOnFocus: false,
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    getProductsInfo: builder.query({
      query: ({ page, pageSize, keyword = "" }) =>
        `${productBaseUrl}?page=${
          page - 1
        }&size=${pageSize}&keyword=${keyword}&sortBy=id&sortDir=desc`,
      providesTags: ["Product"],
      keepUnusedDataFor: 5555,
    }),
    getProductCount: builder.query({
      query: () => `${productBaseUrl}/count`,
      providesTags: ["Product"],
      transformResponse: transformResponse,
      keepUnusedDataFor: 5555,
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
  useGetProductsInfoQuery,
  useGetProductCountQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
