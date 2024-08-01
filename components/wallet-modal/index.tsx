import React, { useState } from 'react';
import Modal from 'react-modal';

interface WalletModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  walletData: {
    price: number;
    image: string;
    numbers: number;
  };
}

const customStyles = {
    overlay: {
        zIndex: 1000, // Ensure this is high enough to be on top of other content
      },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '300px',
    padding: '20px',
    borderRadius: '10px',
  },
};

const WalletModal: React.FC<WalletModalProps> = ({ isOpen, onRequestClose, walletData }) => {
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => setQuantity(prevQuantity => prevQuantity + 1);
  const decreaseQuantity = () => setQuantity(prevQuantity => Math.max(1, prevQuantity - 1));

  const totalPrice = walletData.price * quantity;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Wallet Modal"
    >
      <div className="flex flex-col items-center">
        <img src={walletData.image} alt={`imagenumber${walletData.numbers}`} className="object-cover my-4" />
        <p>{walletData.numbers} عکس</p>
        <div className="flex items-center my-4">
          <button onClick={decreaseQuantity} className="px-3 py-1 bg-gray-300 rounded">-</button>
          <span className="mx-4">{quantity}</span>
          <button onClick={increaseQuantity} className="px-3 py-1 bg-gray-300 rounded">+</button>
        </div>
        <p className="mt-2">جمع: {totalPrice} تومان</p>
        <hr className="my-4 w-full border-gray-300" />
        <div className="w-full text-center mb-4">لوگو بانک</div>
        <button onClick={onRequestClose} className="mt-4 p-2 bg-orange-500 text-white rounded w-full">خرید</button>
      </div>
    </Modal>
  );
};

export default WalletModal;
