import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchLoginData } from "./categoryAPI/categoryAPI";

export const getLoginData = createAsyncThunk("loginData/fetchAll", async () => {
  const data = await fetchLoginData();
  return data;
});

const loginSlice = createSlice({
  name: "loginData",
  initialState: {
    data: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLoginData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getLoginData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(getLoginData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default loginSlice.reducer;
