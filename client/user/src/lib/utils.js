import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const transformResponse = (response) => response.data;

export const transformErrorResponse = (response) => {
  const { data = {} } = response;
  const errorResObj = {
    errorMessage: "",
  };

  if (response.data) {
    errorResObj.errorMessage =
      data?.errorMessage ||
      data?.detail ||
      "Something went wrong, please try again later!";
  } else {
    errorResObj.errorMessage = "Something went wrong, please try again later!";
  }

  return errorResObj;
};

export const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  prepareHeaders: (headers) => {
    // const token = keycloakService.getToken();
    // if (token) {
    //   headers.set("Authorization", `Bearer ${token}`);
    // }
    return headers;
  },
});
