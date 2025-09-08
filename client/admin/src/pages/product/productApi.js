import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery, transformResponse } from "../../lib/utils";

const productBaseUrl = "/admin/products";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: baseQuery,
  tagTypes: ["Product"],

  refetchOnMountOrArgChange: false,
  refetchOnFocus: false,
  refetchOnReconnect: false,
  endpoints: (builder) => ({
    getProductsInfo: builder.query({
      query: ({ page, pageSize, keyword = "" }) =>
        `${productBaseUrl}?page=${
          page - 1
        }&size=${pageSize}&keyword=${keyword}&sortBy=id&sortDir=desc`,
      providesTags: (result, error, arg) => [
        { type: "Product", id: "LIST" },
        {
          type: "Product",
          id: `LIST-${arg.page}-${arg.pageSize}-${arg.keyword}`,
        },
      ],
      keepUnusedDataFor: 600, // Keep cache for 10 minutes
    }),
    getProductCount: builder.query({
      query: () => `${productBaseUrl}/count`,
      providesTags: [{ type: "Product", id: "COUNT" }],
      transformResponse: transformResponse,
      keepUnusedDataFor: 600, // Keep cache for 10 minutes
    }),
    createProduct: builder.mutation({
      query: (product) => ({
        url: productBaseUrl,
        method: "POST",
        body: product,
      }),
      invalidatesTags: [
        { type: "Product", id: "LIST" },
        { type: "Product", id: "COUNT" },
      ],
    }),
    updateProduct: builder.mutation({
      query: (product) => ({
        url: `${productBaseUrl}/${product.curSku}`,
        method: "PUT",
        body: product,
      }),
      invalidatesTags: [
        { type: "Product", id: "LIST" },
        { type: "Product", id: "COUNT" },
      ],
    }),
    deleteProduct: builder.mutation({
      query: (sku) => ({
        url: `${productBaseUrl}/${sku}`,
        method: "DELETE",
      }),
      invalidatesTags: [
        { type: "Product", id: "LIST" },
        { type: "Product", id: "COUNT" },
      ],
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
