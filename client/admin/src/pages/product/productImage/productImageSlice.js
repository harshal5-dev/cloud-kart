import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productImageOperation: "CREATE",
  selectedProductSku: null,
  selectedProductImage: null,
};

const productImageSlice = createSlice({
  name: "productImage",
  initialState,
  reducers: {
    setProductImageOperation: (state, action) => {
      state.productImageOperation = action.payload;
    },
    setSelectedProductImage: (state, action) => {
      state.selectedProductImage = action.payload;
    },
    clearSelectedProductImage: (state) => {
      state.selectedProductImage = null;
    },
    clearProductImageOperation: (state) => {
      state.productImageOperation = "CREATE";
    },
    setProductSku: (state, action) => {
      state.selectedProductSku = action.payload;
    },
    clearProductSku: (state) => {
      state.selectedProductSku = null;
    },
  },
});

export const {
  setProductImageOperation,
  setSelectedProductImage,
  clearSelectedProductImage,
  clearProductImageOperation,
  setProductSku,
  clearProductSku,
} = productImageSlice.actions;

export default productImageSlice.reducer;
