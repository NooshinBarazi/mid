'use client'
import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import { addNews } from "@/redux/features/news/newsSlice";
import { AppDispatch } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export default function AddNews() {
  const { register, handleSubmit, reset} = useForm();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const onSubmit = async(data: any) =>{
       const formData = new FormData();
       formData.append("title", data.title);
       formData.append("description", data.description);
       if (data.image && data.image[0]) {
         formData.append("image", data.image[0]);
       } else {
         console.error("No image file selected.");
         return;
       }

       const res = await dispatch(addNews(formData)).unwrap();
       if (addNews.fulfilled.match(res)) {
        toast('خبر با موفقیت اضافه شد')
         reset();
         router.push("/profile");
       } else {
         console.error("Failed to add news:", res.error.message);
       }
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
