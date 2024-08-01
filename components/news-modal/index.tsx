
import React, { useState } from "react";

interface NewsModalProps {
  newsItem: {
    id: number;
    title: string;
    description: string;
    image: string;
  };
  isVisible: boolean;
  onClose: () => void;
  onEdit: (updatedNews: any) => void;
  onDelete: () => void;
}

const NewsModal: React.FC<NewsModalProps> = ({ newsItem, isVisible, onClose, onEdit, onDelete }) => {
  const [title, setTitle] = useState(newsItem.title);
  const [description, setDescription] = useState(newsItem.description);

  const handleSubmit = () => {
    onEdit({ title, description });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-xl font-bold mb-4">ویرایش خبر</h2>
        <div className="mb-4">
          <label className="block text-gray-700">عنوان</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">توضیحات</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-2"
          />
        </div>
        {newsItem.image && <img src={newsItem.image} alt={newsItem.title} className="mb-4" />}
        <div className="flex justify-end gap-4">
          <button onClick={handleSubmit} className="bg-blue-500 text-white py-2 px-4 rounded">ویرایش</button>
          <button onClick={onDelete} className="bg-red-500 text-white py-2 px-4 rounded">حذف</button>
          <button onClick={onClose} className="bg-gray-500 text-white py-2 px-4 rounded">انصراف</button>
        </div>
      </div>
    </div>
  );
};

export default NewsModal;
