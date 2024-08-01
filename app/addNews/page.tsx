'use client'
import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import { useForm } from "react-hook-form";

export default function AddNews() {
  const { register, handleSubmit } = useForm();

  const onSubmit = () =>{
    console.log("onSubmit add  newa")
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-start">
      <Header />
      <div className="flex-grow z-10 w-full max-w-5xl items-center justify-between p-4 text-sm ">
          <h2 className="text-2xl mb-10">افزودن خبر</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label className="block text-right text-gray-700 w-1/4">
              عنوان
            </label>
            <input
              type="text"
              {...register("title", { required: true })}
              className="w-full mb-4 p-2 border rounded"
            />
            <label className="block text-right text-gray-700 w-1/4">
              توضیحات
            </label>
            <textarea
              {...register("description", { required: true })}
              className="w-full mb-4 p-2 border rounded"
            />
            <label className="block text-right text-gray-700 ">تصویر</label>
            <input
              type="file"
              {...register("image", { required: true })}
              className="w-full mb-4 p-2 "
              accept="image/*"
            />
            {/* </div> */}
            <button
              type="submit"
              className="bg-orange-500 text-white py-2 px-8 rounded"
            >
              تایید
            </button>
          </form>
      </div>
      <Footer />
    </main>
  );
}
