import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AuthService from "../services/auth.service";
import {
  INIT_CODE,
  SIGNUP_SUCCESSFUL,
  UNDEFINED_ERROR,
} from "../constants/MessageCode";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = user
  ? {
      code: INIT_CODE,
      isLoggedIn: true,
      user,
    }
  : {
      code: INIT_CODE,
      isLoggedIn: false,
      user: null,
    };

export const signup = createAsyncThunk(
  "auth/signup",
  async ({ username, email, password }, thunkAPI) => {
    try {
      const data = await AuthService.signup(username, email, password);
      if (data.code === SIGNUP_SUCCESSFUL) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (error) {
      const message = error.message || error.toString();
      return thunkAPI.rejectWithValue({ code: UNDEFINED_ERROR, message: message });
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }, thunkAPI) => {
    try {
      const data = await AuthService.login(username, password);
      if (data.username) {
        return { user: data };
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (error) {
      const message = error.message || error.toString();
      return thunkAPI.rejectWithValue({ code: UNDEFINED_ERROR, message: message });
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await AuthService.logout();
});



const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [signup.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
      state.code = action.payload.code;
    },
    [signup.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.code = action.payload.code;
    },
    [login.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
    },
    [login.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    [logout.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

const { reducer } = authSlice;
export default reducer;
