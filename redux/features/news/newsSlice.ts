import axiosInstance from "@/core/http-service";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

interface AuthState {
  news: News[];
  loading: boolean;
  error: string | null;
}

interface News {
  id: number;
  created_at: string;
  title: string;
  description: string;
  is_valid_to_show: boolean;
  image: string;
}

interface AddNewsFormData {
  title: string;
  description: string;
  image: FileList;
}

const initialState: AuthState = {
  news: [],
  loading: false,
  error: null,
};

export const fetchNews = createAsyncThunk(
  "news/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const token = Cookies.get("token");
      const headers = token ? { Authorization: `"Bearer ${token}"` } : {};
      const res = await axiosInstance.get("/news/", { headers });
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const addNews = createAsyncThunk(
  "news/add",
  async (data: FormData, { rejectWithValue }) => {
    try {
      const token = Cookies.get("token");
      const headers = token
        ? {
            Authorization: `"Bearer ${token}"`,
            "Content-Type": "multipart/form-data",
          }
        : {};
      const res = await axiosInstance.post("/news/", data, { headers });
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchNewsById = createAsyncThunk(
  "news/fetchById",
  async (id: number, { rejectWithValue }) => {
    try {
      const token = Cookies.get("token");
      const headers = token ? { Authorization: `"Bearer ${token}"` } : {};
      const res = await axiosInstance.get(`/news/${id}/`, { headers });
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateNews = createAsyncThunk(
  "news/update",
  async ({ id, updatedNews }: any, { rejectWithValue }) => {
    try {
      const token = Cookies.get("token");
      const headers = token ? { Authorization: `"Bearer ${token}"` } : {};
      const res = await axiosInstance.put(`/news/${id}/`, updatedNews, {
        headers,
      });
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const patchNews = createAsyncThunk(
  "news/patch",
  async (
    { id, partialNews }: { id: number; partialNews: Partial<News> },
    { rejectWithValue }
  ) => {
    try {
      const token = Cookies.get("token");
      const headers = token ? { Authorization: `"Bearer ${token}"` } : {};
      const res = await axiosInstance.patch(`/news/${id}/`, partialNews, {
        headers,
      });
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteNews = createAsyncThunk(
  "news/delete",
  async (id: number, { rejectWithValue }) => {
    try {
      const token = Cookies.get("token");
      const headers = token ? { Authorization: `"Bearer ${token}"` } : {};
      await axiosInstance.delete(`/news/${id}/`, { headers });
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNews.fulfilled, (state, action: PayloadAction<News[]>) => {
        state.loading = false;
        state.news = action.payload;
        state.error = null;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch news";
      })
      .addCase(addNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addNews.fulfilled, (state, action: PayloadAction<News>) => {
        state.loading = false;
        state.news.push(action.payload);
        state.error = null;
      })
      .addCase(addNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to add news";
      })
      .addCase(fetchNewsById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchNewsById.fulfilled,
        (state, action: PayloadAction<News>) => {
          state.loading = false;
          state.news = [action.payload]; // Assuming you want to replace with specific news
          state.error = null;
        }
      )
      .addCase(fetchNewsById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch news by id";
      })
      .addCase(updateNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateNews.fulfilled, (state, action: PayloadAction<News>) => {
        state.loading = false;
        const index = state.news.findIndex(
          (news) => news.id === action.payload.id
        );
        if (index !== -1) {
          state.news[index] = action.payload;
        }
        state.error = null;
      })
      .addCase(updateNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update news";
      })
      // Patch news by id
      .addCase(patchNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(patchNews.fulfilled, (state, action: PayloadAction<News>) => {
        state.loading = false;
        const index = state.news.findIndex(
          (news) => news.id === action.payload.id
        );
        if (index !== -1) {
          state.news[index] = action.payload;
        }
        state.error = null;
      })
      .addCase(patchNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to patch news";
      })
      .addCase(deleteNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteNews.fulfilled, (state, action: PayloadAction<number>) => {
        state.loading = false;
        state.news = state.news.filter((news) => news.id !== action.payload);
        state.error = null;
      })
      .addCase(deleteNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to delete news";
      });
  },
});

export default newsSlice.reducer;
