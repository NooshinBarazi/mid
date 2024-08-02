"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import NewsModal from "../news-modal";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { deleteNews, fetchNews, fetchNewsById, updateNews } from "@/redux/features/news/newsSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const NewsTab = () => {
  const [selectedNews, setSelectedNews] = useState<any>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const news = useSelector((state: RootState) => state.news.news);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
       dispatch(fetchNews());
  }, []);

  const handleNewsClick = async (newsItem: any) => {
       const res = await dispatch(fetchNewsById(newsItem.id));
       if (fetchNewsById.fulfilled.match(res)) {
         setSelectedNews(res.payload);
         setIsModalVisible(true);
       } else {
         console.error("Failed to fetch news by id:", res.error.message);
       }
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedNews(null);
  };

  const handleEditNews = async (updatedNews: any) => {
       if (selectedNews) {
         const res = await dispatch(
           updateNews({ id: selectedNews.id, updatedNews })
         );
         if (updateNews.fulfilled.match(res)) {
           setSelectedNews(res.payload);
           setIsModalVisible(false);
           toast("خبر با موفقیت ویرایش شد");
           dispatch(fetchNews());
         } else {
           console.error("Failed to update news:", res.error.message);
         }
       }
  };

  const handleDeleteNews = async () => {
       if (selectedNews) {
         const res = await dispatch(deleteNews(selectedNews.id));
         if (deleteNews.fulfilled.match(res)) {
           handleCloseModal();
           toast("خبر با موفقیت حذف شد");
           dispatch(fetchNews());
         } else {
           console.error("Failed to delete news:", res.error.message);
         }
       }
  };

  return (
    <div className="flex flex-col gap-4">
      {news.length === 0 ? (
        <p className="text-center mt-4 text-orange-500 p-4">
          هیچ خبری وجود ندارد
        </p>
      ) : (
        news.map((item) => (
          <div
            key={item.id}
            className="card bg-gray-50 shadow-l p-4 cursor-pointer"
            onClick={() => handleNewsClick(item)}
          >
            <div className="flex justify-start items-center">
              <div className="w-4 h-4 rounded-full bg-blue-500"></div>
              <h3 className="font-bold text-xl p-3">{item.title}</h3>
            </div>
            <p className="px-2">{item.description}</p>
          </div>
        ))
      )}
      <Link href="/addNews" className="fixed bottom-20 left-4 bg-orange-500 text-white py-2 px-4 text-2xl rounded-full">
        +
      </Link>
    
      {selectedNews && (
        <NewsModal
          newsItem={selectedNews}
          isVisible={isModalVisible}
          onClose={handleCloseModal}
          onEdit={handleEditNews}
          onDelete={handleDeleteNews}
        />
      )}
    </div>
  );
};

export default NewsTab;
