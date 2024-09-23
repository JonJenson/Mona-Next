'use client'; // Ensure this is at the top

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Use next/navigation for app directory
import TotalCartCheckout from '@/app/checkout/total_cart';
import MainLayout from '@/components/mainLayout';
import CartItem from './cart_item';
import FormComponent from '@/app/checkout/formComponent';
import html2pdf from 'html2pdf.js';
import BillTemplate from '../checkout/bill_template';
import { useCart } from '@/context/CartContext';

const Checkout: React.FC = () => {
  const router = useRouter(); // Initialize useRouter
  const { cart, clearCart } = useCart();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [userDetails, setUserDetails] = useState<{
    name: string;
    phone: string;
    email: string;
  } | null>(null);

  const subtotal = cart.reduce((total, item) => {
    return total + (item.price || 0);
  }, 0);

  const discount = 5;
  
  const tax=5;

  const handleToggleForm = () => {
    setIsFormVisible(prevState => !prevState);
  };

  const handleFormSubmit = (formData: {
    name: string;
    phone: string;
    email: string;
  }) => {
    setUserDetails(formData);
    generateInvoice(formData);
    setIsFormVisible(false);
  };

  const generateInvoice = (formData: {
    name: string;
    phone: string;
    email: string;
  }) => {
    setTimeout(() => {
      const element = document.getElementById('invoice');
      if (element) {
        const opt = {
          margin: 1,
          filename: 'invoice.pdf',
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
        };

        // Generate PDF
        html2pdf().from(element).set(opt).save().then(() => {
          setUserDetails(null);
          clearCart();
          router.push('/'); // Redirect to home page
        });
      }
    }, 100);
  };

  return (
    <MainLayout>
      <div className='container mx-auto px-4 py-8'>
        <h2 className='mb-6 font-playfair text-2xl font-bold'>YOUR CART</h2>
        <div className='flex flex-col gap-8 lg:flex-row'>
          <CartItem />

          {/* Payment Details */}
          <div className='rounded-lg bg-gray-100 p-6 shadow-md lg:w-1/3'>
            <TotalCartCheckout subtotal={subtotal} discount={discount} tax={tax}/>
            <br />
            <button
              onClick={handleToggleForm}
              className='w-full rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700'
            >
              Checkout
            </button>
          </div>
        </div>

        {isFormVisible && (
          <div className='fixed inset-0 z-50 flex items-center justify-center bg-gray-900/75'>
            <div className='relative w-full max-w-lg rounded-md bg-white p-6'>
              {/* Close Icon */}
              <i
                onClick={handleToggleForm}
                className='bx bx-x absolute right-4 top-4 cursor-pointer rounded-full border border-gray-500 text-2xl text-gray-500 hover:text-red-500'
              ></i>
              <FormComponent onFormSubmit={handleFormSubmit} />
            </div>
          </div>
        )}

        {/* Hidden BillTemplate for PDF generation */}
        <div id='invoice' className=''>
          {userDetails && cart.length > 0 && (
            <BillTemplate userDetails={userDetails} cartItems={cart} subtotal={subtotal} discount={discount} tax={tax}/>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Checkout;
