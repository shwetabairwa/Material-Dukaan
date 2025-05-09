import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchShopCategories } from './categoryAPI/categoryAPI';

export const getShopCategories = createAsyncThunk(
  'shopCategory/fetchAll',
  async () => {
    const data = await fetchShopCategories();
    return data;
  }
);


const shopCategorySlice = createSlice({
  name: 'shopCategory',
  initialState: {
    categories: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getShopCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getShopCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = action.payload;
      })
      .addCase(getShopCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default shopCategorySlice.reducer;
