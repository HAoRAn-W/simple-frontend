import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  INIT_CODE,
  SUCCESSFUL,
  UNDEFINED_ERROR,
} from "../services/MessageCode";
import PostService from "../services/post.service";

const initialState = {
  code: INIT_CODE,
  post: {},
};

export const getpost = createAsyncThunk(
  "post/getpost",
  async ({ postId }, thunkAPI) => {
    try {
      const data = await PostService.getPost(postId);
      if (data.code === SUCCESSFUL) {
        console.log("slice data:")
        console.log(data);
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

const postSlice = createSlice({
  name: "post",
  initialState,
  extraReducers: {
    [getpost.fulfilled]: (state, action) => {
      state.code = SUCCESSFUL;
      state.post = action.payload.post;
    },
    [getpost.rejected]: (state, action) => {
      state.code = action.payload.code;
      state.post = {};
    },
  },
});

const { reducer } = postSlice;
export default reducer;