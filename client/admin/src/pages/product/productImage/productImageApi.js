import { createApi } from "@reduxjs/toolkit/query/react";

import { baseQuery, transformResponse } from "../../../lib/utils";

const productImageBaseUrl = "/admin/products";

export const productImageApi = createApi({
  reducerPath: "productImageApi",
  baseQuery: baseQuery,
  tagTypes: ["ProductImage"],
  endpoints: (builder) => ({
    getProductImages: builder.mutation({
      query: (productSku) => `${productImageBaseUrl}/${productSku}/images`,
      providesTags: ["ProductImage"],
      transformResponse: transformResponse,
    }),
    createProductImage: builder.mutation({
      query: (productImage) => ({
        url: `${productImageBaseUrl}/${productImage.productSku}/images`,
        method: "POST",
        body: productImage,
      }),
      invalidatesTags: ["ProductImage"],
    }),
    updateProductImage: builder.mutation({
      query: (productImage) => ({
        url: `${productImageBaseUrl}/${productImage.productSku}/images/${productImage.id}`,
        method: "PUT",
        body: productImage,
      }),
      invalidatesTags: ["ProductImage"],
    }),
    deleteProductImage: builder.mutation({
      query: ({ productSku, id }) => ({
        url: `${productImageBaseUrl}/${productSku}/images/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ProductImage"],
    }),
  }),
});

export const {
  useGetProductImagesMutation,
  useCreateProductImageMutation,
  useUpdateProductImageMutation,
  useDeleteProductImageMutation,
} = productImageApi;
