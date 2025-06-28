import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryOperation: "CREATE",
  selectedCategory: null,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategoryOperation: (state, action) => {
      state.categoryOperation = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    clearSelectedCategory: (state) => {
      state.selectedCategory = null;
    },
    clearCategoryOperation: (state) => {
      state.categoryOperation = "CREATE";
    },
  },
});

export const {
  setCategoryOperation,
  setSelectedCategory,
  clearSelectedCategory,
  clearCategoryOperation,
} = categorySlice.actions;

export default categorySlice.reducer;
