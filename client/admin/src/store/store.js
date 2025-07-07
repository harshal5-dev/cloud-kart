import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/auth/authSlice";
import themeReducer from "../features/themeSlice";
import { categoryApi } from "../pages/category/categoryApi";
import { productApi } from "../pages/product/productApi";
import { productImageApi } from "../pages/product/productImage/productImageApi";
import { userApi } from "../pages/users/usersApi";
import { addressApi } from "../pages/users/addressApi";
import { adminApi } from "../pages/users/adminApi";

const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [addressApi.reducerPath]: addressApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [productImageApi.reducerPath]: productImageApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }).concat(
      categoryApi.middleware,
      productApi.middleware,
      productImageApi.middleware,
      userApi.middleware,
      addressApi.middleware,
      adminApi.middleware
    ),
});

export default store;
