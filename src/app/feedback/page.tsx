'use client';
import React from 'react';
import { Service } from '@/lib/types';
import { useCart } from '@/context/CartContext';

const services: Service[] = [
  {
    id: 1,
    title: "Haircut",
    description: "Professional haircut service.",
    price: 200,
    image: "Eyebrow.png",
  },
  {
    id: 2,
    title: "Manicure",
    description: "Luxurious manicure service.",
    price: 500,
    image: "Eyebrow.png",
  },
  {
    id: 3,
    title: "Massage",
    description: "Relaxing full body massage.",
    price: 1000,
    image: "Eyebrow.png",
  },
];

const ItemsPage: React.FC = () => {
  const { addToCart } = useCart();

  const handleAddToCart = (service: Service) => {
    addToCart(service);
    alert(`${service.title} added to cart!`);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {services.map((service) => (
        <div key={service.id} className="border p-4 shadow-md rounded-md">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-40 object-cover mb-4"
          />
          <h2 className="text-lg font-bold">{service.title}</h2>
          <p className="text-gray-600">{service.description}</p>
          <p className="text-gray-800 font-bold">₹{service.price}</p>
          <button
            onClick={() => handleAddToCart(service)}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default ItemsPage;
