import { configureStore } from "@reduxjs/toolkit";

import { productApi } from "../pages/product/productApi";
const store = configureStore({
  reducer: {
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }).concat(productApi.middleware),
});

export default store;
