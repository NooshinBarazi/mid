import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/auth/authSlice";
import userSlice from "./features/user/userSlice";
import imagesSlice from "./features/images/imagesSlice";
import plansSlice from "./features/plans/plansSlice";
import newsSlice from "./features/news/newsSlice";

console.log('userSlice', userSlice);

 const store = configureStore({
  reducer: {
   auth: authSlice,
   user: userSlice,
   images: imagesSlice,
   plans: plansSlice,
   news: newsSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat()
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;


