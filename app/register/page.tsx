"use client";
import Image from "next/image";
import { useForm } from "react-hook-form";

export default function Register() {
  const { register, handleSubmit } = useForm();

  const onSubmit = () => {
    console.log("onsubmit register");
  };

  return (
    <main className="min-h-screen flex  items-center justify-center p-4">
      <div className="bg-white md:shadow-lg rounded-lg p-8 w-full max-w-md">
      <div className="text-xl font-bold flex justify-center mb-8">
          <Image
            src={`/assets/images/logomid.jpg`}
            alt="Logo"
            width={64}
            height={64}
            className="rounded-lg"
          />
        </div>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              نام <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-green-100"
            {...register('name')}
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              نام خانوادگی <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-green-100"
              {...register('family')}
           />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              تاریخ تولد
            </label>
            <input
              type="date"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-green-100"
              {...register('birthday')}
           />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              شماره موبایل
            </label>
            <div className="flex items-center">
             
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-green-100"
                {...register('phoneNumber')}
              />
               {/* <span className="mr-2">+</span> */}
            </div>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              کد اشتراک
            </label>
            <div className="flex items-center">
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-green-100"
                {...register('code')}
              />
              <input
                type="checkbox"
                className="mr-2 h-6 w-6 text-green-500 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
          <button className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 mt-4">
            ثبت نام
          </button>
          <div className="mt-4 text-center flex justify-center gap-2">
          <p className="text-gray-700">قبلا ثبت نام کرده اید؟</p>
          <a href="/login" className="text-blue-500 hover:text-blue-700 transition duration-300 ease-in-out">
            ورود به حساب کاربری
          </a>
        </div>
        </form>
      </div>
    </main>
  );
}
