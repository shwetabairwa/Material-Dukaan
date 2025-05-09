import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchMainCategories } from './categoryAPI/categoryAPI';

export const getMainCategories = createAsyncThunk(
  'mainCategory/fetchAll',
  async () => {
    const data = await fetchMainCategories();
    return data;
  }
);


const mainCategorySlice = createSlice({
  name: 'mainCategory',
  initialState: {
    categories: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMainCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getMainCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = action.payload;
      })
      .addCase(getMainCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default mainCategorySlice.reducer;
