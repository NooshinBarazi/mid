import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from 'js-cookie';

interface AuthState {
  access: string | null;
  refresh: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  access: null,
  refresh: null,
  loading: false,
  error: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async (data: any, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/users/sign-in/`, data);

      return res;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const signUp = createAsyncThunk(
  "auth/signUp",
  async (data: any, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/users/auth/`, data);

      Cookies.set('token', res.data.access);
      Cookies.set('refresh', res.data.refresh);

      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


export const refreshToken = createAsyncThunk(
  "auth/refreshToken",
  async (
    { refresh, access }: { refresh: string; access: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/users/token/refresh/`, {
        refresh,
        access,
      });
      localStorage.setItem("token", res.data.access);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.access = action.payload;
      localStorage.setItem("token", action.payload);
    },
    setRefreshToken: (state, action: PayloadAction<string>) => {
      state.refresh = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.access = action.payload.access;
        state.refresh = action.payload.refresh;
        state.error = null;
        Cookies.set('token', action.payload.access);
        Cookies.set('refresh', action.payload.refresh);
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "sign up Failed";
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Login Failed";
      })
      .addCase(refreshToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(refreshToken.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.access = action.payload.access;
        state.refresh = action.payload.refresh;
        state.error = null;
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.toString() || "Failed to refresh token";
      });
  },
});

export const { setToken, setRefreshToken } = authSlice.actions;
export default authSlice.reducer;
