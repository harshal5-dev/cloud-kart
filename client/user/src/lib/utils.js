import { fetchBaseQuery } from "@reduxjs/toolkit/query";

export const transformResponse = (response) => response.data;

export const mapToSelect = (data = [], key = "id", valueKey = "name") =>
  data.map((item) => ({ value: item[key], label: item[valueKey] }));

export const pick = (object, keys) =>
  keys.reduce((result, key) => {
    if (key in object) {
      result[key] = object[key];
    }
    return result;
  }, {});

export const isEmpty = (object) =>
  object === null || object === undefined || Object.keys(object).length === 0;

export const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL || "http://localhost:5558/api/v1",
  // prepareHeaders: (headers) => {
  //   const token = keycloakService.getToken();
  //   if (token) {
  //     headers.set("Authorization", `Bearer ${token}`);
  //   }
  //   return headers;
  // },
});

export const getRandomTagColor = () => {
  const colors = [
    "magenta",
    "red",
    "volcano",
    "orange",
    "gold",
    "lime",
    "green",
    "cyan",
    "blue",
    "geekblue",
    "purple",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};
