import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productOperation: "CREATE",
  selectedProduct: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProductOperation: (state, action) => {
      state.productOperation = action.payload;
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
    clearProductOperation: (state) => {
      state.productOperation = "CREATE";
    },
  },
});

export const {
  setProductOperation,
  setSelectedProduct,
  clearSelectedProduct,
  clearProductOperation,
} = productSlice.actions;

export default productSlice.reducer;
