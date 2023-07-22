import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import PageService from "../services/page.service";
import {
  INIT_CODE,
  SUCCESSFUL,
  UNDEFINED_ERROR,
} from "../constants/MessageCode";

const initialState = {
  code: INIT_CODE,
  posts: [],
  total: 1,
};

export const loadpage = createAsyncThunk(
  "page/loadpage",
  async ({ page }, thunkAPI) => {
    try {
      const data = await PageService.loadPage(page);
      if (data.code === SUCCESSFUL) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (error) {
      const message = error.message || error.toString();
      return thunkAPI.rejectWithValue({
        code: UNDEFINED_ERROR,
        message: message,
      });
    }
  }
);

const pageSlice = createSlice({
  name: "page",
  initialState,
  extraReducers: {
    [loadpage.fulfilled]: (state, action) => {
      state.code = SUCCESSFUL;
      state.posts = action.payload.posts;
      state.total = action.payload.total;
    },
    [loadpage.rejected]: (state, action) => {
      state.code = action.payload.code;
      state.posts = [];
      state.total = 1;
    },
  },
});

const { reducer } = pageSlice;
export default reducer;
