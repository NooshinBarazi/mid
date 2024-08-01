"use client";
import Link from "next/link";
import React, { useState } from "react";
import NewsModal from "../news-modal";

type NewsItem = {
  id: number;
  title: string;
  description: string;
};

const NewsTab = () => {
  const [selectedNews, setSelectedNews] = useState<any>();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const news: NewsItem[] = [
    { id: 1, title: "خبر اول", description: "توضیحات خبر اول." },
    { id: 2, title: "خبر دوم", description: "توضیحات خبر دوم." },
    { id: 3, title: "خبر سوم", description: "توضیحات خبر سوم." },
  ];

  const handleNewsClick = async (newsItem: any) => {
    setSelectedNews(newsItem);
    setIsModalVisible(true);

  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedNews(null);
  };

  const handleEditNews = async (updatedNews: any) => {};

  const handleDeleteNews = async () => {};

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
