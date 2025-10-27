import { createApi } from "@reduxjs/toolkit/query/react";
import {
  baseQuery,
  transformErrorResponse,
  transformResponse,
} from "../../lib/utils";

const productBaseUrl = "/products";

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
      transformErrorResponse: transformErrorResponse,
    }),
    getProductDetails: builder.query({
      query: (sku) => `${productBaseUrl}/${sku}`,
      providesTags: (result, error, arg) => [{ type: "Product", id: arg }],
      transformErrorResponse: transformErrorResponse,
      transformResponse: transformResponse,
    }),
  }),
});

export const { useGetProductsInfoQuery, useGetProductDetailsQuery } =
  productApi;
