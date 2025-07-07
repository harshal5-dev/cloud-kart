import { createApi } from "@reduxjs/toolkit/query/react";

import {
  baseQuery,
  transformErrorResponse,
  transformResponse,
} from "../../../lib/utils";

const productImageBaseUrl = "/admin/products";

export const productImageApi = createApi({
  reducerPath: "productImageApi",
  baseQuery: baseQuery,
  tagTypes: ["ProductImage"],

  refetchOnMountOrArgChange: false,
  refetchOnFocus: false,
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    getProductImages: builder.query({
      query: (productSku) => `${productImageBaseUrl}/${productSku}/images`,
      providesTags: ["ProductImage"],
      transformResponse: transformResponse,
      keepUnusedDataFor: 5555,
    }),
    createProductImage: builder.mutation({
      query: (productImage) => ({
        url: `${productImageBaseUrl}/${productImage.productSku}/images`,
        method: "POST",
        body: productImage,
      }),
      invalidatesTags: ["ProductImage"],
      transformErrorResponse: transformErrorResponse,
    }),
    updateProductImage: builder.mutation({
      query: (productImage) => ({
        url: `${productImageBaseUrl}/${productImage.productSku}/images/${productImage.id}`,
        method: "PUT",
        body: productImage,
      }),
      invalidatesTags: ["ProductImage"],
      transformErrorResponse: transformErrorResponse,
    }),
    deleteProductImage: builder.mutation({
      query: ({ productSku, id }) => ({
        url: `${productImageBaseUrl}/${productSku}/images/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ProductImage"],
      transformErrorResponse: transformErrorResponse,
    }),
  }),
});

export const {
  useGetProductImagesQuery,
  useCreateProductImageMutation,
  useUpdateProductImageMutation,
  useDeleteProductImageMutation,
} = productImageApi;
