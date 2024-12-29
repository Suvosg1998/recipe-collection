import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {  endPoint } from "../../Api/api";
import axiosInstance from "../../Api/AxiosInstance";

// Async thunk to fetch tags
export const fetchTags = createAsyncThunk("tags/fetchTags", async () => {
  const response = await axiosInstance.get(endPoint.tags);
  return response.data.tags || [];
});

const tagsSlice = createSlice({
  name: "tags",
  initialState: {
    tags: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTags.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTags.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tags = action.payload;
      })
      .addCase(fetchTags.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default tagsSlice.reducer;
