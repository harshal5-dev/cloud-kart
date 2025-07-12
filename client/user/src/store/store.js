import { configureStore } from "@reduxjs/toolkit";

import themeReducer from "../features/themeSlice";
import { categoryApi } from "../pages/category/categoryApi";
import { productApi } from "../pages/product/productApi";

const store = configureStore({
  reducer: {
    theme: themeReducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      categoryApi.middleware,
      productApi.middleware
    ),
});

export default store;
