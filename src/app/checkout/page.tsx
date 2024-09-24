'use client'; // Ensure this is at the top
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Use next/navigation for app directory
import dynamic from 'next/dynamic'; // Import dynamic
import TotalCartCheckout from '@/app/checkout/total_cart';
import MainLayout from '@/components/mainLayout';
import CartItem from './cart_item';
import FormComponent from '@/app/checkout/formComponent';
import { useCart } from '@/context/CartContext';

// Load PDFGenerator dynamically to ensure it's only loaded on the client-side
const PDFGenerator = dynamic(() => import('./pdfGenerator'), {
  ssr: false, // Ensure this is client-side only
});

const Checkout: React.FC = () => {
  const router = useRouter(); // Initialize useRouter
  const { cart, clearCart } = useCart();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [userDetails, setUserDetails] = useState<{
    name: string;
    phone: string;
    email: string;
  } | null>(null);

  // Calculate the subtotal, discount, and tax
  const subtotal = cart.reduce((total, item) => total + (item.price || 0), 0);
  const discount = 5;
  const tax = 5;

  // Toggle the visibility of the checkout form
  const handleToggleForm = () => {
    setIsFormVisible((prevState) => !prevState);
  };

  // Handle form submission
  const handleFormSubmit = (formData: {
    name: string;
    phone: string;
    email: string;
  }) => {
    setUserDetails(formData); // Save user details
    setIsFormVisible(false);  // Hide the form after submission
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h2 className="mb-6 font-playfair text-2xl font-bold">YOUR CART</h2>
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Render Cart Items */}
          <CartItem />

          {/* Payment Details */}
          <div className="rounded-lg bg-gray-100 p-6 shadow-md lg:w-1/3">
            <TotalCartCheckout subtotal={subtotal} discount={discount} tax={tax} />
            <br />
            <button
              onClick={handleToggleForm}
              className="w-full rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
            >
              Checkout
            </button>
          </div>
        </div>

        {/* Show the form if isFormVisible is true */}
        {isFormVisible && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/75">
            <div className="relative w-full max-w-lg rounded-md bg-white p-6">
              {/* Close Icon */}
              <i
                onClick={handleToggleForm}
                className="bx bx-x absolute right-4 top-4 cursor-pointer rounded-full border border-gray-500 text-2xl text-gray-500 hover:text-red-500"
              ></i>
              <FormComponent onFormSubmit={handleFormSubmit} />
            </div>
          </div>
        )}

        {/* Render the PDF generator when userDetails is available */}
        {userDetails && cart.length > 0 && (
          <PDFGenerator
            userDetails={userDetails}
           cartItems={cart}
            subtotal={subtotal}
            discount={discount}
            tax={tax}
            clearCart={clearCart} // Clears the cart after generating the PDF
            router={router}       // Redirect the user if needed
          />
        )}
      </div>
    </MainLayout>
  );
};

export default Checkout;
