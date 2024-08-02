"use client";
import { useState } from "react";
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight  } from "react-icons/md";


const categories = [
  { name: "لباس", items: ["Shirt1", "Shirt2"] },
  { name: "کیف", items: ["Pant1", "Pant2"] },
  { name: "کفش", items: ["Pant1", "Pant2"] },
  { name: "عینک", items: ["Pant1", "Pant2"] },
  { name: "ساعت", items: ["Pant1", "Pant2"] },
];

const filters = [
  { name: "جنسیت", options: ["مرد", "زن"] },
  { name: "سایز", options: ["کوچک", "متوسط", "بزرگ"] },
//   { name: "قیمت", options: ["Option1", "Option2", "Option3"] },
];

export default function Shopping() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen">
      {isSidebarOpen && (
        <div className="w-64 p-4 border-r">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold mb-4">فیلترها</h2>
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="btn btn-ghost"
            >
              {isSidebarOpen ? <MdKeyboardDoubleArrowRight size={35}/> : <MdKeyboardDoubleArrowLeft size={35}/>}
            </button>
          </div>
          {filters.map((filter) => (
            <div key={filter.name} className="mb-4">
              <h3 className="text-lg font-medium mb-2">{filter.name}</h3>
              {filter.options.map((option) => (
                <div key={option} className="form-control">
                  <label className="cursor-pointer label">
                    <span className="label-text">{option}</span>
                    <input
                      type="checkbox"
                      className="checkbox checkbox-primary"
                    />
                  </label>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
      <div className="flex-1">
        <div className="flex justify-between items-center p-4 border-b">
          <div className="tabs">
            {categories.map((category) => (
              <a
                key={category.name}
                className={`tab tab-bordered ${
                  selectedCategory.name === category.name ? "tab-active" : ""
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category.name}
              </a>
            ))}
          </div>
        </div>
        <div className="p-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {selectedCategory.items.map((item, index) => (
            <div key={index} className="card shadow-lg">
              <figure>
                <img src={`/assets/images/car-red.jpg`} alt={item} />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{item}</h2>
                <p>Description of {item}</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Buy Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
