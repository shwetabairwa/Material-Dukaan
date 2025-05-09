import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProductCategories } from './categoryAPI/categoryAPI';

export const getProductCategories = createAsyncThunk(
  'productCategory/fetchAll',
  async () => {
    const data = await fetchProductCategories();
    return data;
  }
);


const productCategorySlice = createSlice({
  name: 'productCategory',
  initialState: {
    categories: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getProductCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = action.payload;
      })
      .addCase(getProductCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default productCategorySlice.reducer;
