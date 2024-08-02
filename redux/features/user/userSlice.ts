import axiosInstance from "@/core/http-service";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from 'js-cookie';

interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

interface User {
  date_of_birth: string;
  first_name: string;
  last_name: string;
  email: string
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};


export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (_, { rejectWithValue }) => {
    try {
      const token =  Cookies.get('token');
      const headers = token ? { Authorization: `"Bearer ${token}"` } : {};
      const res = await axiosInstance.get('/users/', { headers });
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (data: User, { rejectWithValue }) => {
    try {
      const token =  Cookies.get('token');
      const headers = token ? { Authorization: `"Bearer ${token}"` } : {};
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/users/`, data, {headers});
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: { },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state, action) => {
        state.loading = true;
        console.log('fetch user pend', action.payload)

      })
      .addCase(fetchUser.fulfilled, (state, action: PayloadAction<User>) => {
        console.log('fetch user', action.payload)
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch user information";
        console.log('fetch user', action.payload)

      })
      .addCase(updateUser.pending, (state, action) => {
        state.loading = true;
        console.log('update user pend', action.payload)

      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<User>) => {
        console.log('update user full', action.payload)
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch user information";
        console.log('update user reject', action.payload)

      })
  },
});


export default userSlice.reducer;
