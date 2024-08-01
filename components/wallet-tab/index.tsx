"use client";
import React, { useState } from "react";
import WalletModal from "../wallet-modal";


type Plan = {
  price: number;
  image: string; 
  numbers: number;
};

const WalletTab = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState<any>(    { price: 100, image: '/assets/images/car-gray.jpg', numbers: 10 },
  );

  const plans: Plan[] = [
    { price: 100, image: '/assets/images/car-gray.jpg', numbers: 10 },
    { price: 200, image: '/assets/images/car-gray.jpg', numbers: 20 },
    { price: 300, image: '/assets/images/car-gray.jpg', numbers: 30 },
  ];

  const openModal = (walletItem: Plan) => {
    setSelectedWallet(walletItem);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };


  return (
    <div>
      <p className="mb-12">موجودی: 10 عکس</p>
      <div>
        <p> ارتقاء حساب</p>
        <hr className="mb-12 mt-2 h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10" />

        <div className="grid lg:grid-cols-4 gap-4">
          {plans && plans.map((walletItem: Plan) => (
            <div
              className="bg-gray-100 rounded-lg overflow-hidden h-48 w-42 flex flex-col justify-around items-center cursor-pointer"
              key={walletItem.price}
              onClick={() => openModal(walletItem as any)}
            >
              <img
                   src={walletItem.image}
                   alt={`imagenumber${walletItem.numbers}`}
              />
              <div className="flex flex-col items-center">
                <p className="text-xs">قیمت </p>
                <p className="text-sm">{walletItem.price} تومان</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-12">
        <p>واریزی ها</p>
        <hr className="mb-12 mt-2 h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10" />

        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  تاریخ و زمان
                </th>
                <th scope="col" className="px-6 py-3">
                  مقدار
                </th>
                <th scope="col" className="px-6 py-3">
                  حساب
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  Apple MacBook Pro 17
                </th>
                <td className="px-6 py-4">Silver</td>
                <td className="px-6 py-4">Laptop</td>
              </tr>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Microsoft Surface Pro
                </th>
                <td className="px-6 py-4">White</td>
                <td className="px-6 py-4">Laptop PC</td>
              </tr>
              <tr className="bg-white dark:bg-gray-800">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Magic Mouse 2
                </th>
                <td className="px-6 py-4">Black</td>
                <td className="px-6 py-4">Accessories</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <WalletModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        walletData={selectedWallet}
      />
    </div>
  );
};

export default WalletTab;
