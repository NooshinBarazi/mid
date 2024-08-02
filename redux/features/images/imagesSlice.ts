import axiosInstance from "@/core/http-service";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';

interface ImageState {
  images: string[];
  friends_images: string[];
  loading: boolean;
  error: string | null;
}

interface Image {
  id: number;
  url: string;
}

interface ChangeColorPayload {
  id: number;
  colorData: any;
}

interface EnhanceImageQualityPayload {
  qualityData: any;
}

interface OverlayImagePayload {
  id: number;
  overlayData: any;
}

interface RemoveBackgroundPayload {
  backgroundData: any;
}

const initialState: ImageState = {
  images: [],
  friends_images: [],
  loading: false,
  error: null,
};

export const fetchImages = createAsyncThunk(
  "images/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const token = Cookies.get("token");
      const headers = token ? { Authorization: `"Bearer ${token}"` } : {};
      const res = await axiosInstance.get("/images/", { headers });
      console.log("fetch image suces", res.data);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const changeColor = createAsyncThunk(
  "images/changeColor",
  async ({ id, colorData }: ChangeColorPayload, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post(`/images/change-color/`, {
        id,
        ...colorData,
      });
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const enhanceImageQuality = createAsyncThunk(
  "images/enhanceQuality",
  async ({ qualityData }: EnhanceImageQualityPayload, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post(
        `/images/enhance-image-quality/`,
        qualityData
      );
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const overlayImage = createAsyncThunk(
  "images/overlay",
  async ({ id, overlayData }: OverlayImagePayload, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post(`/images/overlay-image/`, {
        id,
        ...overlayData,
      });
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const removeBackground = createAsyncThunk(
  "images/removeBackground",
  async ({ backgroundData }: RemoveBackgroundPayload, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post(
        `/images/remove-background/`,
        backgroundData
      );
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const imagesSlice = createSlice({
  name: "images",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchImages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchImages.fulfilled, (state, action: PayloadAction<any>) => {
        console.log("action fetch image", action.payload);
        const { your_images, friends_images } = action.payload;
        state.loading = false;
        state.images = your_images.map((img: { image: string }) => img.image);
        state.friends_images = friends_images;
        state.error = null;
      })
      .addCase(fetchImages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch images";
      })
      .addCase(changeColor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changeColor.fulfilled, (state, action: PayloadAction<Image>) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(changeColor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to change color";
      })
      .addCase(enhanceImageQuality.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        enhanceImageQuality.fulfilled,
        (state, action: PayloadAction<Image>) => {
          state.loading = false;
          state.error = null;
        }
      )
      .addCase(enhanceImageQuality.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to enhance image quality";
      })
      .addCase(overlayImage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        overlayImage.fulfilled,
        (state, action: PayloadAction<Image>) => {
          state.loading = false;
          state.error = null;
        }
      )
      .addCase(overlayImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to overlay image";
      })
      .addCase(removeBackground.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        removeBackground.fulfilled,
        (state, action: PayloadAction<Image>) => {
          state.loading = false;
          console.log("action", action.payload);
          state.error = null;
        }
      )
      .addCase(removeBackground.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to remove background";
      });
  },
});

export default imagesSlice.reducer;
