import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchSubCategories } from './categoryAPI/categoryAPI';

export const getSubCategories = createAsyncThunk(
  'subCategory/fetchAll',
  async () => {
    const data = await fetchSubCategories();
    return data;
  }
);


const subCategorySlice = createSlice({
  name: 'subCategory',
  initialState: {
    categories: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSubCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getSubCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = action.payload;
      })
      .addCase(getSubCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default subCategorySlice.reducer;
