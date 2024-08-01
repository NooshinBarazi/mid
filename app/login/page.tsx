"use client";
import { login, setToken, signUp } from "@/redux/features/auth/authSlice";
import { AppDispatch } from "@/redux/store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

export default function Login() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { register, handleSubmit, watch } = useForm();
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()

  const onSubmit = (data: any) => {
    console.log("onsubmit login");
    setIsModalOpen(true);
    dispatch(login({phone_number: data.phoneNumber}))
  };

  const authHandler = async () => {
    setIsModalOpen(false);
     const code= watch("code");
      const phoneNumber =  watch("phoneNumber");
    try {
      const response = await dispatch(signUp({code: code, phone_number: phoneNumber}));
      if (response.payload.access) {
        setToken(response.payload.access);
        router.push("/");
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  return (
    <main className="min-h-screen flex  items-center justify-center p-4">
      <div className="bg-white md:shadow-lg rounded-lg p-8 w-full max-w-md">
        <div className="text-xl font-bold flex justify-center mb-8">
          <Image
            src="/assets/images/logomid.jpg"
            alt="Logo"
            width={64}
            height={64}
            className="rounded-lg"
          />
        </div>
        <div className="mb-6">
          <div className="border-2 border-gray-300 bg-gray-200 rounded-lg h-64"></div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6">
            <input
              type="text"
              placeholder="شماره موبایل"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              {...register("phoneNumber")}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600"
          >
            ورود
          </button>
        </form>
        <div className="mt-4 text-center flex justify-center gap-2">
          <p className="text-gray-700">ثبت نام نکرده اید؟</p>
          <a
            href="/register"
            className="text-blue-500 hover:text-blue-700 transition duration-300 ease-in-out"
          >
            ایجاد حساب کاربری
          </a>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setIsModalOpen(false)}
            >
              ✕
            </button>
            <h3 className="text-md font-bold mb-4 text-center mt-4">
              کد ارسال شده به شماره همراه را وارد کنید
            </h3>
            <input
              type="text"
              placeholder="کد ارسالی"
              className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              {...register("code")}
            />
            <button
              className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600"
              //   onClick={authHandler}
            >
              ارسال
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
