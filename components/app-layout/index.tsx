"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { AppDispatch, RootState } from "@/redux/store";
import { refreshToken } from "@/redux/features/auth/authSlice";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();
  const authState = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(async () => {
      if (authState.access && authState.refresh) {
        try {
          const response = await dispatch(
            refreshToken({
              refresh: authState.refresh,
              access: authState.access!,
            })
          ).unwrap();

          if (!response.access) {
            router.push("/login");
          }
        } catch (error) {
          console.error("Token validation error", error);
          router.push("/login");
        }
      }
    }, 3600000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {children}
      <ToastContainer />
    </>
  );
};

export default AppLayout;
