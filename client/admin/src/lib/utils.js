import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import keycloakService from "../services/keycloakService";

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
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  prepareHeaders: (headers) => {
    const token = keycloakService.getToken();
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
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

export const getCategorySlugColor = (slug) => {
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
  const index = slug.charCodeAt(0) % colors.length;
  return colors[index];
};

export const getRoleColor = (role) => {
  const colors = {
    USER: "blue",
    PREMIUM: "orange",
    ADMIN: "green",
    MANAGER: "purple",
  };
  return colors[role] || "default";
};
